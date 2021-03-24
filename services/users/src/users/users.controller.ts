import { Body, Controller, Post, UseGuards } from '@nestjs/common';
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
}
