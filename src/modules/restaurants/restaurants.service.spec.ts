import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsService } from './restaurants.service';

describe('RestaurantsService', () => {
  let repository: RestaurantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantsService],
    }).compile();

    repository = module.get<RestaurantsService>(RestaurantsService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
