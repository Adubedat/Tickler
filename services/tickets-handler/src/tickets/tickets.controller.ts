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
  create(@Body() createTicketDto: CreateTicketDto) {
    console.log(createTicketDto);
    return this.ticketsService.create(createTicketDto);
  }

  @Get()
  async findAll() {
    return await this.ticketsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.ticketsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ) {
    return await this.ticketsService.update(id, updateTicketDto);
  }

  @UseGuards(isAdminOrCreatorGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.ticketsService.remove(id);
  }
}
