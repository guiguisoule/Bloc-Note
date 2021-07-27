import { TestBed } from '@angular/core/testing';

import { Questionnaire3Service } from './questionnaire3.service';

describe('Questionnaire3Service', () => {
  let service: Questionnaire3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Questionnaire3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
