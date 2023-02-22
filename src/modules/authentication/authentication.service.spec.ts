import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let repository: AuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthenticationService],
    }).compile();

    repository = module.get<AuthenticationService>(AuthenticationService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
