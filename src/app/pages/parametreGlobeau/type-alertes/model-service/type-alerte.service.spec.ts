import { TestBed } from '@angular/core/testing';

import { TypeAlerteService } from './type-alerte.service';

describe('TypeAlerteService', () => {
  let service: TypeAlerteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeAlerteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
