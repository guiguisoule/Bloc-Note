import { TestBed } from '@angular/core/testing';

import { SecteursService } from './secteurs.service';

describe('SecteursService', () => {
  let service: SecteursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecteursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
