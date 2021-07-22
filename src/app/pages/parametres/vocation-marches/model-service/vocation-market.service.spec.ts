import { TestBed } from '@angular/core/testing';

import { VocationMarketService } from './vocation-market.service';

describe('VocationMarketService', () => {
  let service: VocationMarketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VocationMarketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
