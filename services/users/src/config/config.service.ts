export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {
      host: process.env.USERS_SERVICE_HOST,
      http_port: process.env.USERS_SERVICE_PORT,
      tcp_port: process.env.USERS_SERVICE_TCP_PORT,
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
