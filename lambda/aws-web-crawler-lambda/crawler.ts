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
import aws_chromium from '@sparticuz/chromium';
import { Page } from 'playwright';
import { JSDOM } from 'jsdom';
import { Configuration, PlaywrightCrawler, PlaywrightCrawlingContext } from 'crawlee';
import { CrawlerAgentRequest, CrawlerSimpleRequest, PageMetadata } from './types';
import { Readability } from '@mozilla/readability';

export class Crawler {
  async process(request: CrawlerSimpleRequest) {
    const urls = request.urls?.map((url) => url.trim()) ?? [];

    let crawler = await this.create_crawler({ include_html: request.include_html });
    await crawler.run(urls);

    const data = await crawler.getData();
    const items = data['items'];

    return items;
  }

  async process_agent(request: CrawlerAgentRequest) {
    const urls = request.parameters?.filter((param) => param.name === 'url').map((param) => param.value.trim()) ?? [];

    let crawler = await this.create_crawler({ include_html: false });
    await crawler.run(urls);

    const data = await crawler.getData();
    const items = data['items'];
    const item = items.length > 0 ? items[0] : null;

    return {
      messageVersion: '1.0',
      response: {
        actionGroup: request.actionGroup,
        apiPath: '/crawler',
        httpMethod: 'GET',
        httpStatusCode: 200,
        responseBody: {
          'application/json': {
            body: JSON.stringify(item),
          },
        },
      },
      sessionAttributes: {},
      promptSessionAttributes: {},
    };
  }

  private async create_crawler(params: { include_html?: boolean }) {
    const crawler = new PlaywrightCrawler(
      {
        launchContext: {
          launchOptions: {
            executablePath: await aws_chromium.executablePath(),
            args: aws_chromium.args,
            headless: true,
          },
        },
        maxRequestsPerCrawl: 25,
        maxRequestRetries: 5,
        preNavigationHooks: [
          async (crawlingContext, gotoOptions) => {
            if (gotoOptions && crawlingContext.request.retryCount >= 2) {
              gotoOptions.waitUntil = 'domcontentloaded';
            }
          },
        ],
        requestHandler: async (context: PlaywrightCrawlingContext) => {
          try {
            await this.requestHandler(context, { include_html: params.include_html });
          } catch (e) {
            console.error(e);
          }
        },
        failedRequestHandler: async (ctx: PlaywrightCrawlingContext) => {
          console.error(`Failed to load page: ${ctx.request.errorMessages}`, {
            url: ctx.request.url,
          });
        },
      },
      new Configuration({
        persistStorage: false,
      }),
    );

    return crawler;
  }

  private async requestHandler(ctx: PlaywrightCrawlingContext, params: { include_html?: boolean }) {
    const contentType = await this.getContentType(ctx.response);
    if (contentType !== 'text/html') {
      console.log('Content type', contentType);
      return;
    }

    const status = ctx.response?.status();
    if (status !== 200) {
      console.log('Status', status);
      return;
    }

    const meta = await this.getPageMetadata(ctx.page);
    console.log(`${meta.title}`, { url: ctx.request.loadedUrl });
    const page_html = await ctx.page.innerHTML('html');

    const page = new JSDOM(page_html, {
      url: ctx.request.loadedUrl,
    });

    const text_content = new Readability(page.window.document).parse()?.textContent ?? '';
    const html_content = params.include_html ? page_html : undefined;

    const item = {
      success: true,
      content_type: contentType,
      url: ctx.request.url,
      meta,
      text_content,
      html_content,
    };

    await ctx.pushData(item);
  }

  private async getContentType(response: any | undefined) {
    const contentType = await response?.headerValue('content-type');

    if (contentType) {
      return contentType.split(';')[0].trim();
    }

    return 'text/html';
  }

  private async getPageMetadata(page: Page): Promise<PageMetadata> {
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
}
