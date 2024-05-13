export interface CrawlerRequest {
  kind: 'crawler-request';
  urls: string[];
}

export interface PageMetadata {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
}
