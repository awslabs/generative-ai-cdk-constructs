import aws_chromium from '@sparticuz/chromium';
import { Page } from 'playwright';
import { JSDOM } from 'jsdom';
import { Configuration, PlaywrightCrawler, PlaywrightCrawlingContext } from 'crawlee';
import { CrawlerRequest, PageMetadata } from './types';
import { Readability } from '@mozilla/readability';

export class Crawler {
  async process_crawler_request(request: CrawlerRequest) {
    const urls = request.urls.map((url) => url.trim());
    let crawler = await this.create_crawler();
    await crawler.run(urls);
    const retValue = await crawler.getData();

    return retValue;
  }

  async create_crawler() {
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
            await this.requestHandler(context);
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

  async requestHandler(ctx: PlaywrightCrawlingContext) {
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
    const html_content = await ctx.page.innerHTML('html');

    const page = new JSDOM(html_content, {
      url: ctx.request.loadedUrl,
    });

    const text_content = new Readability(page.window.document).parse()?.textContent ?? '';

    await ctx.pushData({
      success: true,
      content_type: contentType,
      url: ctx.request.url,
      meta,
      html_content,
      text_content,
    });
  }

  async getContentType(response: any | undefined) {
    const contentType = await response?.headerValue('content-type');

    if (contentType) {
      return contentType.split(';')[0].trim();
    }

    return 'text/html';
  }

  async getPageMetadata(page: Page): Promise<PageMetadata> {
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
