import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: 'tickets-handler',
      port: 4020,
    },
  });

  await app.startAllMicroservicesAsync();
  await app.listen(3020);
}
bootstrap();
