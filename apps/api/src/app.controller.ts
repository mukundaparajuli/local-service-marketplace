import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as types from '@marketplace/types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): types.Service {
    return this.appService.getHello();
  }
}
