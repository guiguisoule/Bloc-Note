import { TestBed } from '@angular/core/testing';

import { PeriodiciteEnquetteService } from './periodicite-enquette.service';

describe('PeriodiciteEnquetteService', () => {
  let service: PeriodiciteEnquetteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeriodiciteEnquetteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
