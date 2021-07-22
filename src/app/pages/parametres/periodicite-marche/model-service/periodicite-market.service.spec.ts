import { TestBed } from '@angular/core/testing';

import { PeriodiciteMarketService } from './periodicite-market.service';

describe('PeriodiciteMarketService', () => {
  let service: PeriodiciteMarketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeriodiciteMarketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
