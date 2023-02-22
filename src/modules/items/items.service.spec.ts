import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';

describe('ItemsService', () => {
  let repository: ItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemsService],
    }).compile();

    repository = module.get<ItemsService>(ItemsService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
