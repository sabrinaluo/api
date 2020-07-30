export enum ListType {
  ARTICLE,
  QUESTION,
}

export interface CrawlerArticleItem {
  vol: string;
  url: string;
  id: number;
  author: string;
  title: string;
}

export type CrawlerQuestionItem = Omit<CrawlerArticleItem, 'author'>;

export interface CrawlerSlideItem {
  vol: string;
  url: string;
  id: number;
  author: string;
  content: string;
  day: string;
  month: string;
}

export interface CrawlerHome {
  article: {
    list: CrawlerArticleItem[];
    one: CrawlerArticleItem;
  };
  question: {
    list: CrawlerQuestionItem[];
    one: CrawlerQuestionItem;
  };
  slide: CrawlerSlideItem[];
}

export interface CrawlerQuestion {
  question: {
    title: string;
    content: string;
  };
  answer: {
    title: string;
    content: string;
  };
}

export interface CrawlerArticle {
  quote: string;
  title: string;
  author: string;
  editor: string;
  content: string;
}
