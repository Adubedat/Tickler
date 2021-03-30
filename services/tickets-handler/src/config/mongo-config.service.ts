import {
  MongooseOptionsFactory,
  MongooseModuleOptions,
} from '@nestjs/mongoose';

export class MongoConfigService implements MongooseOptionsFactory {
  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: `mongodb://${process.env.TICKETS_HANDLER_SERVICE_HOST}-db:27017/${process.env.MONGO_DATABASE}`,
      useFindAndModify: false,
      useCreateIndex: true,
      useNewUrlParser: true,
    };
  }
}
