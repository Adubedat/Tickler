import { Test, TestingModule } from '@nestjs/testing';
import { TicketsController } from './tickets.controller';
// import { TicketsService } from './tickets.service';
import { TicketsModule } from './tickets.module';

describe('TicketsController', () => {
  let controller: TicketsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TicketsModule],
    }).compile();

    controller = module.get<TicketsController>(TicketsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
