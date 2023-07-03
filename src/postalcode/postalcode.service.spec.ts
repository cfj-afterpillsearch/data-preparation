import { Test, TestingModule } from '@nestjs/testing';
import { PostalcodeService } from './postalcode.service';

describe('PostalcodeService', () => {
  let service: PostalcodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostalcodeService],
    }).compile();

    service = module.get<PostalcodeService>(PostalcodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
