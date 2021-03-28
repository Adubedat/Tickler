import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket, TicketDocument } from './schemas/tickets.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,
  ) {}

  create(createTicketDto: CreateTicketDto) {
    const createdTicket = new this.ticketModel(createTicketDto);
    return createdTicket.save();
  }

  async findAll() {
    return await this.ticketModel.find().sort({ modified: -1 });
  }

  async findOne(id: string) {
    try {
      const existingTicket = await this.ticketModel.findOne({ _id: id });

      if (!existingTicket) {
        throw new NotFoundException(`Ticket not found`);
      }

      return existingTicket;
    } catch (error) {
      throw new BadRequestException('Invalid parameters');
    }
  }

  async update(id: string, updateTicketDto: UpdateTicketDto) {
    try {
      const existingTicket = await this.ticketModel.findByIdAndUpdate(
        { _id: id },
        updateTicketDto,
        { new: true },
      );

      if (!existingTicket) {
        throw new NotFoundException(`Ticket not found`);
      }

      return existingTicket;
    } catch (error) {
      throw new BadRequestException('Invalid parameters');
    }
  }

  async remove(id: string) {
    // try {
    const result = await this.ticketModel.deleteOne({ _id: id });

    // if (result.deletedCount === 0) {
    //   throw new NotFoundException(`Ticket not found`);
    // }

    return result;
    // } catch (error) {
    //   throw new BadRequestException('Invalid parameters');
    // }
  }
}
