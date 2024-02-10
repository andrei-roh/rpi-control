import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { Message } from 'src/types';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('getHello', () => {
    it(`should return "${Message.ServiceStart}"`, () => {
      const appController = app.get(AppController);
      expect(appController.getHello()).toBe(Message.ServiceStart);
    });
  });
});
