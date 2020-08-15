import {
  CrawlerArticleItem,
  CrawlerQuestionItem,
  CrawlerSlideItem,
  ListType,
} from '../types/crawler';

const getIdFromUrl = (url: string) => {
  const match = url.match(/\/(\d+)$/) || [];
  return Number(match[1]) || 0;
};

export function parseList(
  $list: CheerioStatic,
  type: ListType.ARTICLE,
): CrawlerArticleItem[];
export function parseList(
  $list: CheerioStatic,
  type: ListType.QUESTION,
): CrawlerQuestionItem[];
export function parseList($: any, type: ListType) {
  const isArticle = type === ListType.ARTICLE;
  const $list = $('.pasado').eq(type).find('li');
  return Array.from($list).map((_, i) => {
    const $li = $list.eq(i);
    const $a = $li.find('a');
    const url = $a.attr('href');

    return {
      vol: $li.find('.text-muted').text().trim(),
      url,
      id: getIdFromUrl(url),
      ...(isArticle
        ? {
            author: $li.find('small').text().trim().substring(2),
            title: $a.contents()[0].data.trim(),
          }
        : {
            title: $a.text().trim(),
          }),
    };
  });
}

export const parseArticleOne = ($: CheerioStatic): CrawlerArticleItem => {
  const articleOneUrl = $('.one-articulo-titulo a').attr('href');
  return {
    id: getIdFromUrl(articleOneUrl),
    vol: $('.one-titulo').eq(0).text().trim(),
    url: articleOneUrl,
    title: $('.one-articulo-titulo a').contents()[0].data.trim(),
    author: $('.one-articulo-titulo small').text().trim().substring(2),
  };
};

export const parseQuestionOne = ($: CheerioStatic): CrawlerQuestionItem => {
  const url = $('.one-cuestion-titulo a').attr('href');

  return {
    id: getIdFromUrl(url),
    vol: $('.one-titulo').eq(1).text().trim(),
    url,
    title: $('.one-cuestion-titulo').text().trim(),
  };
};

export const parseSlide = ($: CheerioStatic): CrawlerSlideItem[] => {
  const $list = $('.carousel-inner .item');
  return Array.from($list).map((_, i) => {
    const $item = $list.eq(i);
    const url = $item.find('a').eq(1).attr('href');

    return {
      url,
      content: $item
        .find('a')
        .eq(1)
        .text()
        .trim()
        .replace(/(?!\n)\s+/g, ''),
      img: $item.find('img').attr('src'),
      id: getIdFromUrl(url),
      author: $item.find('.fp-one-imagen-footer').text().trim().slice(0, -3),
      vol: $item.find('.titulo').text().trim(),
      day: $item.find('.dom').text().trim(),
      month: $item.find('.may').text().trim(),
    };
  });
};
