import { Crawler } from './crawler';
import 'jquery';

/*
{
  "kind": "crawler-request",
  "urls": [
    "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "https://docs.aws.amazon.com/bedrock/latest/studio-ug/what-is-bedrock-studio.html"
  ]
}
*/

export async function handler(event: any) {
  console.log('Event', event);

  const crawler = new Crawler();
  const data = await crawler.process_crawler_request(event);
  const items = data['items'];

  return items;
}
