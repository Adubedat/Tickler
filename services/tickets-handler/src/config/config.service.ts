import { Transport } from '@nestjs/microservices';

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {
      host: process.env.TICKETS_HANDLER_SERVICE_HOST,
      http_port: process.env.TICKETS_HANDLER_SERVICE_PORT,
      tcp_port: process.env.TICKETS_HANDLER_SERVICE_TCP_PORT,
      usersService: {
        name: 'AUTH_CLIENT',
        options: {
          port: process.env.USERS_SERVICE_TCP_PORT,
          host: process.env.USERS_SERVICE_HOST,
        },
        transport: Transport.TCP,
      },
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
