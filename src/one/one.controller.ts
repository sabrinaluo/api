import { Controller, Get, Param } from '@nestjs/common';

import { OneService } from './one.service';

@Controller('one')
export class OneController {
  constructor(private readonly oneService: OneService) {}
  @Get()
  getOneHome() {
    return this.oneService.getHome();
  }

  @Get('question/:id(\\d+)')
  getQuestionById(@Param('id') id: number) {
    return this.oneService.getQuestionById(id);
  }

  @Get('article/:id(\\d+)')
  getArticleById(@Param('id') id: number) {
    return this.oneService.getArticleById(id);
  }
}
