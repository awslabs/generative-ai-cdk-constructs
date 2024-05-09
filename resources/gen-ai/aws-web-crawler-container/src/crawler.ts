/**
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance
 *  with the License. A copy of the License is located at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES
 *  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions
 *  and limitations under the License.
 */
import { promises as fsPromises } from 'fs';
import { FileHandle } from 'node:fs/promises';
import log from '@apify/log';
import { isProbablyReaderable } from '@mozilla/readability';
import {
  Configuration as CrawleeConfiguration,
  EnqueueStrategy,
  PlaywrightCrawler,
  PlaywrightCrawlingContext,
  RobotsFile,
  Sitemap,
} from 'crawlee';
import { JSDOM } from 'jsdom';
import { Page } from 'playwright';
import { chromium } from 'playwright-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
import { extensionToMimeType, fileTypes, mimeTypeToExtension } from './common/content-types.js';
import { Configuration } from './managers/config-manager.js';
import { DynamoDBManager } from './managers/dynamodb-manager.js';
import { DataItem, HtmlMetadata, JobStatus, TargetDataItem, SuccessDataItem, TargetType } from './types.js';
import { Utils } from './utils.js';

const MAX_REQUESTS = 25_000;

export class Crawler {
  private readonly debug: boolean = false;
  private itemsProcessed: number = 0;
  private maxRequests: number = 0;
  private robots: RobotsFile[] = [];
  private files: {
    pages: FileHandle | null;
    files: FileHandle | null;
    errors: FileHandle | null;
  } = { pages: null, files: null, errors: null };

  constructor(
    private readonly config: Configuration,
    private readonly targetDataItem: TargetDataItem,
    private readonly dynamoDBManager: DynamoDBManager,
    private readonly additionalUrls: string[],
  ) {
    this.maxRequests = this.get_max_requests();
    log.info(`Max requests: ${this.maxRequests}`);
  }

  async start() {
    log.info('Starting Web Crawler');

    const urls = new Set<string>([...this.additionalUrls]);

    if (this.targetDataItem.target_type === TargetType.WEBSITE) {
      urls.add(this.targetDataItem.target_url);
      const baseUrls = Utils.unique([Utils.getBaseUrl(this.targetDataItem.target_url) ?? '']).filter((c) => c);
      const sitemaps = await this.processRobotsTxt(baseUrls);
      await this.processSitemaps(sitemaps, urls);
    }

    const initialUrls = Array.from(urls).sort();
    await this.writeSitemaps(initialUrls);

    try {
      await this.openFiles();
      await this.run(initialUrls);
    } finally {
      await this.closeFiles();
    }
  }

  private async run(urls: string[]) {
    chromium.use(stealthPlugin());

    const crawler = new PlaywrightCrawler(
      {
        launchContext: { launcher: chromium },
        browserPoolOptions: {
          useFingerprints: true,
        },
        maxRequestsPerCrawl: this.maxRequests,
        retryOnBlocked: true,
        maxConcurrency: 1,
        sameDomainDelaySecs: 1,
        preNavigationHooks: [
          async (crawlingContext, gotoOptions) => {
            if (gotoOptions && crawlingContext.request.retryCount >= 2) {
              gotoOptions.waitUntil = 'domcontentloaded';
            }
          },
        ],
        postNavigationHooks: [
          async (crawlingContext) => {
            if (crawlingContext.response?.status() === 429) {
              await Utils.wait(1 * 60 * 1000);
            }
          },
        ],
        requestHandler: async (context: PlaywrightCrawlingContext) => {
          try {
            await this.requestHandler(context);
          } catch (error: any) {
            log.error(error);
          }
        },
        failedRequestHandler: async (context: PlaywrightCrawlingContext) => {
          await this.failedRequestHandler(context);
        },
      },
      new CrawleeConfiguration({
        persistStorage: this.debug,
      }),
    );

    await this.dynamoDBManager.updateJobStatus(this.config.jobId, JobStatus.CRAWLING);

    await crawler.run(urls);
    log.info(`Processed ${this.itemsProcessed} items`);
    await this.dynamoDBManager.updateJobItemsProcessed(this.config.jobId, this.itemsProcessed);
  }

  private async requestHandler(ctx: PlaywrightCrawlingContext) {
    const contentType = await this.getContentType(ctx.response);

    if (contentType !== 'text/html') {
      await this.writeData(ctx, 'files', {
        content_type: contentType,
        file_type: mimeTypeToExtension.get(contentType) ?? '',
        url: ctx.request.url,
      });

      return;
    }

    const status = ctx.response?.status();
    if (status !== 200) {
      log.info(`Failed to load page: ${status}`, {
        url: ctx.request.loadedUrl,
      });

      return;
    }

    const meta = await this.getPageMetadata(ctx.page);
    const canonicalLink = await ctx.page.$('link[rel="canonical"]');
    const canonical = (await canonicalLink?.getAttribute('href'))?.trim() ?? undefined;
    log.info(`${meta.title}`, { url: ctx.request.loadedUrl });

    await this.deleteTags(ctx.page, ['script', 'style', 'link', 'iframe']);
    await this.saveLinkedFiles(ctx);

    const content = await (await ctx.page.$('body'))?.innerHTML();
    const doc = new JSDOM(content, {
      url: ctx.request.loadedUrl,
    });

    if (
      !isProbablyReaderable(doc.window.document, {
        minContentLength: 250,
        minScore: 30,
      })
    ) {
      log.info('Page is not readable', { url: ctx.request.loadedUrl });
    } else {
      let dataItem: SuccessDataItem = {
        content_type: contentType,
        url: ctx.request.url,
        canonical,
        meta,
        content,
      };

      await this.writeData(ctx, 'pages', dataItem);
    }

    if (this.targetDataItem.target_type === TargetType.WEBSITE) {
      await ctx.enqueueLinks({
        strategy: EnqueueStrategy.SameDomain,
        transformRequestFunction: (req) => {
          if (fileTypes.has(Utils.getFileType(req.url) ?? '')) return false;

          if (this.targetDataItem.ignore_robots_txt !== true && this.robots && !this.robots.every((c) => c.isAllowed(req.url))) {
            return false;
          }

          return req;
        },
      });
    }
  }

  private async getPageMetadata(page: Page): Promise<HtmlMetadata> {
    const title = await page.title();

    const getMetaContent = async (tag: string, property = 'name') => {
      const metaTag = await page.$(`meta[${property}='${tag}']`);
      return (await metaTag?.getAttribute('content')) ?? undefined;
    };

    const description = await getMetaContent('description');
    const keywords = await getMetaContent('keywords');
    const author = await getMetaContent('author');

    return {
      title,
      description,
      keywords,
      author,
    };
  }

  private async saveLinkedFiles(ctx: PlaywrightCrawlingContext) {
    const links = await ctx.page.$$eval('a', (items) => items.map((link) => link.href));

    const files = links
      .map((linkUrl) => {
        const fileType = Utils.getFileType(linkUrl);
        const contentType = extensionToMimeType.get(fileType ?? '') || 'application/octet-stream';

        const dataItem: SuccessDataItem = {
          content_type: contentType,
          file_type: fileType,
          url: linkUrl,
          base_url: ctx.request.url,
        };

        return dataItem;
      })
      .filter((file) => fileTypes.has(file.file_type || ''));

    for (const file of files) {
      await this.writeData(ctx, 'files', file);
    }
  }

  private async failedRequestHandler(ctx: PlaywrightCrawlingContext) {
    log.info(`Failed to load page: ${ctx.request.errorMessages}`, {
      url: ctx.request.url,
    });

    await this.writeData(ctx, 'errors', {
      url: ctx.request.url,
      error: ctx.request.errorMessages,
    });
  }

  private async openFiles() {
    this.files = {
      pages: await fsPromises.open(this.config.file_paths.pages, 'w'),
      files: await fsPromises.open(this.config.file_paths.files, 'w'),
      errors: await fsPromises.open(this.config.file_paths.errors, 'w'),
    };
  }

  private async closeFiles() {
    await this.files.pages?.close();
    await this.files.files?.close();
    await this.files.errors?.close();
  }

  private get_max_requests() {
    let maxRequests = this.targetDataItem.max_requests ?? MAX_REQUESTS;
    if (maxRequests === 0) maxRequests = MAX_REQUESTS;
    maxRequests = Math.min(maxRequests, MAX_REQUESTS);
    maxRequests = Math.max(maxRequests, 1);

    return maxRequests;
  }

  private async processRobotsTxt(baseUrls: string[]) {
    log.info('Processing robots.txt');

    const sitemaps = new Set<string>([...(this.targetDataItem.sitemaps || [])]);
    for (const baseUrl of baseUrls) {
      const robots = await RobotsFile.find(baseUrl);
      this.robots.push(robots);
      log.info(`Found ${robots.getSitemaps().length} sitemaps for ${baseUrl}`);

      for (const sitemap of robots.getSitemaps()) {
        log.info(`Sitemap: ${sitemap}`);

        if (!sitemap.toLowerCase().startsWith('http://') && !sitemap.toLowerCase().startsWith('https://')) {
          sitemaps.add(`${baseUrl}${sitemap}`);
        } else {
          sitemaps.add(sitemap);
        }
      }
    }

    return sitemaps;
  }

  private async processSitemaps(sitemaps: Set<string>, urls: Set<string>) {
    log.info('Searching for urls in sitemaps');

    if (sitemaps.size > 0) {
      const sitemap = await Sitemap.load(Array.from(sitemaps));
      log.info(`Found urls in sitemaps: ${sitemap.urls.length}`);

      for (const url of sitemap.urls) {
        urls.add(url);
      }
    }
  }

  private async writeData(ctx: PlaywrightCrawlingContext, type: 'pages' | 'files' | 'errors', data: DataItem) {
    const dataFile = this.files[type];

    if (!dataFile) {
      throw new Error('Data file is not open');
    }

    this.itemsProcessed++;

    await dataFile.write(JSON.stringify(data) + '\n');

    if (this.itemsProcessed !== 0 && this.itemsProcessed % 10 === 0) {
      log.info(`Processed: ${this.itemsProcessed} items`);

      if (this.itemsProcessed % 100 === 0) {
        await this.dynamoDBManager.updateJobItemsProcessed(this.config.jobId, this.itemsProcessed);
      }
    }

    if (this.debug) {
      await ctx.pushData(data);
    }
  }

  private async writeSitemaps(urls: string[]) {
    let file: fsPromises.FileHandle | null = null;
    try {
      file = await fsPromises.open(this.config.file_paths.sitemaps, 'w');

      for (const url of urls) {
        await file.write(url + '\n');
      }
    } finally {
      await file?.close();
    }
  }

  private async getContentType(response: any | undefined) {
    const contentType = await response?.headerValue('content-type');

    if (contentType) {
      // Return the content type without the charset.
      return contentType.split(';')[0].trim();
    }

    // By default, we consider the content type to be `text/html`.
    return 'text/html';
  }

  private async deleteTags(page: Page, tags: string[]) {
    for (let tag of tags) {
      for (let element of await page.$$(tag)) {
        await element.evaluate((e) => e.remove());
      }
    }
  }
}
