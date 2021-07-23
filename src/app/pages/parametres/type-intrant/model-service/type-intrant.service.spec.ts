import { TestBed } from '@angular/core/testing';

import { TypeIntrantService } from './type-intrant.service';

describe('TypeIntrantService', () => {
  let service: TypeIntrantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeIntrantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
