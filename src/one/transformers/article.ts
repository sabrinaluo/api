import { CrawlerArticle } from '../types/crawler';

const transformArticle = ($: CheerioStatic): CrawlerArticle => {
  const map = {
    quote: '.comilla-cerrar',
    title: '.articulo-titulo',
    author: '.articulo-autor',
    editor: '.articulo-editor',
  };

  return {
    ...Object.entries(map).reduce((acc, item) => {
      const [key, selector] = item;
      acc[key] = $(selector).text().trim();
      return acc;
    }, {} as typeof map),
    content: $('.articulo-contenido').html().trim(),
  };
};

export default transformArticle;
