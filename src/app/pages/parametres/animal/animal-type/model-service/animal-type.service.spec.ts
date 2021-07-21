import { TestBed } from '@angular/core/testing';

import { AnimalTypeService } from './animal-type.service';

describe('AnimalTypeService', () => {
  let service: AnimalTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimalTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
