import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { isAdminOrCreatorGuard } from './guards/isAdminOrCreator.guard';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  async create(@Body() createTicketDto: CreateTicketDto) {
    const ticket = await this.ticketsService.create(createTicketDto);
    return {
      status: 201,
      message: 'Ticket created',
      data: ticket,
    };
  }

  @Get()
  async findAll() {
    const tickets = await this.ticketsService.findAll();
    return {
      status: 200,
      message: 'Tickets found',
      data: tickets,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const ticket = await this.ticketsService.findOne(id);
    return {
      status: 200,
      message: 'Ticket found',
      data: ticket,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ) {
    const ticket = await this.ticketsService.update(id, updateTicketDto);
    return {
      status: 200,
      message: 'Ticket updated',
      data: ticket,
    };
  }

  @UseGuards(isAdminOrCreatorGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.ticketsService.remove(id);
    return {
      status: 200,
      message: 'Ticket deleted',
    };
  }
}
