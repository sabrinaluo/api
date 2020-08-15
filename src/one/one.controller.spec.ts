import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { OneController } from './one.controller';
import { OneService } from './one.service';

describe('One Controller', () => {
  let oneController: OneController;
  let oneService: OneService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [OneController],
      providers: [OneService],
    }).compile();

    oneController = moduleRef.get<OneController>(OneController);
    oneService = await moduleRef.resolve(OneService);
  });

  it('should be defined', () => {
    expect(oneController).toBeDefined();
  });
});
