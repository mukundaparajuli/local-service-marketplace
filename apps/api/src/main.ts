import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log("starting...")
  await app.listen(process.env.PORT ?? 3001);
  console.log("started...")
}
bootstrap();
