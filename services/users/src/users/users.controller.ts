import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserExistsGuard } from './guards/user-exists.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(UserExistsGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.addUser(createUserDto);
  }

  // TO REMOVE
  // @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }
}
