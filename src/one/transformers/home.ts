import { CrawlerHome, ListType } from '../types/crawler';
import {
  parseArticleOne,
  parseList,
  parseQuestionOne,
  parseSlide,
} from '../utils/parseHtml';

const transformHome = ($: CheerioStatic): CrawlerHome => {
  const article = {
    list: parseList($, ListType.ARTICLE),
    one: parseArticleOne($),
  };

  const question = {
    list: parseList($, ListType.QUESTION),
    one: parseQuestionOne($),
  };

  return {
    article,
    question,
    slide: parseSlide($),
  };
};

export default transformHome;
