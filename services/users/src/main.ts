import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ConfigService } from './/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = new ConfigService();

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: configService.get('host'),
      port: configService.get('tcp_port'),
    },
  });

  await app.startAllMicroservicesAsync();
  await app.listen(configService.get('http_port'));
}
bootstrap();
