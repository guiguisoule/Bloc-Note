import { TestBed } from '@angular/core/testing';

import { Niveau1Service } from './niveau1.service';

describe('Niveau1Service', () => {
  let service: Niveau1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Niveau1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
