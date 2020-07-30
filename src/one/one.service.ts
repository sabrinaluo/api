import { HttpService, Injectable } from '@nestjs/common';

import transformArticle from './transformers/article';
import transformHome from './transformers/home';
import transformQuestion from './transformers/question';

@Injectable()
export class OneService {
  constructor(private httpService: HttpService) {}

  async getHome() {
    const { data } = await this.httpService.get('/').toPromise();
    return transformHome(data);
  }

  async getQuestionById(id: number) {
    const { data } = await this.httpService.get(`/question/${id}`).toPromise();

    return transformQuestion(data);
  }

  async getArticleById(id: number) {
    const { data } = await this.httpService
      .get(`/article/${id}`, {
        params: { id },
      })
      .toPromise();

    return transformArticle(data);
  }
}
