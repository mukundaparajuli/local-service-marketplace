import { Service } from '@marketplace/types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return "hello world";
  }
}
