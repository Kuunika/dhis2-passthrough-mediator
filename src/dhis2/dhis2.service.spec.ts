import { Test, TestingModule } from '@nestjs/testing';
import { DHIS2Service } from './dhis2.service';

describe('Dhis2Service', () => {
  let service: DHIS2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DHIS2Service],
    }).compile();

    service = module.get<DHIS2Service>(DHIS2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
