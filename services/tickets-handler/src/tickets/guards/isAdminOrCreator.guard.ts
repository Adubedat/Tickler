import {
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs/operators';
import { TicketsService } from '../tickets.service';

export class isAdminOrCreatorGuard implements CanActivate {
  constructor(
    @Inject('AUTH_CLIENT')
    private readonly client: ClientProxy,
    private readonly ticketsService: TicketsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const user = await this.client
        .send({ role: 'user', cmd: 'get' }, { id: req.decoded.sub })
        .pipe(timeout(5000))
        .toPromise();

      const ticket = await this.ticketsService.findOne(req.params.id);
      if (user.role === 'admin' || ticket.creator_id === user.id) {
        return true;
      }
      return false;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
