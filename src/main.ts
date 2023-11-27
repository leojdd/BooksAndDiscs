import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Start Nest
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();