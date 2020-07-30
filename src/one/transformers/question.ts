import { CrawlerQuestion } from '../types/crawler';

const transformQuestion = ($: CheerioStatic): CrawlerQuestion => {
  const title = $('h4');
  const content = $('.cuestion-contenido');

  return {
    question: {
      title: title.eq(0).text().trim(),
      content: content.eq(0).html().trim(),
    },
    answer: {
      title: title.eq(1).text().trim(),
      content: content.eq(1).html().trim(),
    },
  };
};

export default transformQuestion;
