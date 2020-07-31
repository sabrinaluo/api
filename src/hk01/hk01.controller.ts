import { Controller, Get, NotFoundException, Param, Req } from '@nestjs/common';
import { Request } from 'express';

import * as articles from './data/articles.json';

@Controller('hk01')
export class Hk01Controller {
  @Get('article/:articleId(\\d+)')
  getArticle(@Param('articleId') articleId: string) {
    const data = articles.filter((item) => item.id === articleId)[0];
    if (data) {
      return data;
    } else {
      throw new NotFoundException();
    }
  }

  @Get('articles')
  getArticles(@Req() req: Request) {
    const { page: _p, limit: _l } = req.query;

    const page = parseInt(_p as string, 10) || 1;
    const limit = parseInt(_l as string, 10) || 10;
    const totalPage = articles.length / limit;

    return {
      articles: articles.slice(page * limit, (page + 1) * limit),
      nextPage: page < totalPage ? page + 1 : null,
      totalPage: totalPage,
    };
  }
}
