import { Service } from '@marketplace/types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): Service {
    return {
      id: 1,
      title: "plumbing",
      hourlyRate: 200,
      providerId: 2
    };
  }
}
