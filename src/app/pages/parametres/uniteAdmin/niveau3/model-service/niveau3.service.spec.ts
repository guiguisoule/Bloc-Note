import { TestBed } from '@angular/core/testing';

import { Niveau3Service } from './niveau3.service';

describe('Niveau3Service', () => {
  let service: Niveau3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Niveau3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
