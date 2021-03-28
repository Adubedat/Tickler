import { Module } from '@nestjs/common';
import { TicketsModule } from './tickets/tickets.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://tickets-handler-db:27017/db', {
      useFindAndModify: false,
    }),
    TicketsModule,
  ],
})
export class AppModule {}
