import * as fs from 'fs';

import { HttpModule, HttpService } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as cheerio from 'cheerio';
import { of } from 'rxjs';

import * as homeData from './__fixtures__/home.json';
import { OneService } from './one.service';

describe('OneService', () => {
  let oneService: OneService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [OneService],
    }).compile();

    oneService = module.get<OneService>(OneService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(oneService).toBeDefined();
  });

  it('should get convert homepage html to json', async () => {
    const html = fs
      .readFileSync(__dirname + '/__fixtures__/home.html')
      .toString('utf-8');
    jest.spyOn(httpService, 'get').mockImplementationOnce(() =>
      of({
        data: cheerio.load(html, { decodeEntities: false }),
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      }),
    );
    const result = await oneService.getHome();
    expect(result).toEqual(homeData);
  });
});
