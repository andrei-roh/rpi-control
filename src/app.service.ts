import { Injectable } from '@nestjs/common';
import { Message } from 'src/types';

@Injectable()
export class AppService {
  getHello(): string {
    return Message.Start;
  }
}
