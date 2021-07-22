import { TestBed } from '@angular/core/testing';

import { DecoupageAdminService } from './decoupage-admin.service';

describe('DecoupageAdminService', () => {
  let service: DecoupageAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecoupageAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
