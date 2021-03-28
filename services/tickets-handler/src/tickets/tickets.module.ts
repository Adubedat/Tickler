import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import * as AutoIncrementFactory from 'mongoose-sequence';
import { Ticket, TicketsSchema } from './schemas/tickets.schema';
import { AuthGuard } from './guards/auth.guards';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Ticket.name,
        useFactory: async (connection: Connection) => {
          const schema = TicketsSchema;
          const AutoIncrement = AutoIncrementFactory(connection);
          schema.plugin(AutoIncrement, { inc_field: 'number' });
          return schema;
        },
        inject: [getConnectionToken()],
      },
    ]),
    ClientsModule.register([
      {
        name: 'AUTH_CLIENT',
        transport: Transport.TCP,
        options: {
          host: 'users',
          port: 4010,
        },
      },
    ]),
  ],
  controllers: [TicketsController],
  providers: [
    TicketsService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class TicketsModule {}
