import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: 'users',
      port: 4010,
    },
  });

  await app.startAllMicroservicesAsync();
  await app.listen(3010);
}
bootstrap();
