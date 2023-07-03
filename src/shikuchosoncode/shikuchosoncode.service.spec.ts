import { Test, TestingModule } from '@nestjs/testing';
import { ShikuchosoncodeService } from './shikuchosoncode.service';

describe('ShikuchosoncodeService', () => {
  let service: ShikuchosoncodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShikuchosoncodeService],
    }).compile();

    service = module.get<ShikuchosoncodeService>(ShikuchosoncodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
