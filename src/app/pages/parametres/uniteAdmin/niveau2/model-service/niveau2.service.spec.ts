import { TestBed } from '@angular/core/testing';

import { Niveau2Service } from './niveau2.service';

describe('Niveau2Service', () => {
  let service: Niveau2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Niveau2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
