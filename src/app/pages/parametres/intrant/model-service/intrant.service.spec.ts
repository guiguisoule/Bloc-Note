import { TestBed } from '@angular/core/testing';

import { IntrantService } from './intrant.service';

describe('IntrantService', () => {
  let service: IntrantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntrantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
