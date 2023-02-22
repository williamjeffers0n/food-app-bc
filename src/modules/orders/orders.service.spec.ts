import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';

describe('OrdersService', () => {
  let repository: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersService],
    }).compile();

    repository = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
