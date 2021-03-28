import {
  Controller,
  Request,
  Post,
  UseGuards,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Request() req) {
    const result = {
      status: HttpStatus.OK,
      message: 'User authenticated',
      data: await this.authService.login(req.user),
    };
    return result;
  }

  @MessagePattern({ role: 'auth', cmd: 'check' })
  async loggedIn(data: { jwt: string }) {
    try {
      return this.authService.validateToken(data.jwt);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
