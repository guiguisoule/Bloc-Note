import { TestBed } from '@angular/core/testing';

import { TypeMarcheService } from './type-marche.service';

describe('TypeMarcheService', () => {
  let service: TypeMarcheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeMarcheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
