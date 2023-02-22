import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let repository: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    repository = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
