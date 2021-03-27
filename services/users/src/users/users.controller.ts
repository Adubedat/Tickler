import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  HttpStatus,
  PreconditionFailedException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/user.dto';
import { UserExistsGuard } from './guards/user-exists.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(UserExistsGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.addUser(createUserDto);
      const data = {
        username: user.username,
        role: user.role,
      };
      const result = {
        status: HttpStatus.CREATED,
        message: 'User created',
        data,
      };
      return result;
    } catch (error) {
      throw new PreconditionFailedException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    const data = users.map((user) => ({
      username: user.username,
      role: user.role,
    }));
    const result = {
      status: HttpStatus.OK,
      message: 'Users found',
      data,
    };
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req) {
    const user = await this.usersService.findOneById(req.user.id);
    const data = {
      username: user.username,
      role: user.role,
    };
    const result = {
      status: HttpStatus.OK,
      message: 'User found',
      data,
    };
    return result;
  }
}
