import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoupageAdminComponent } from './decoupage-admin.component';

describe('DecoupageAdminComponent', () => {
  let component: DecoupageAdminComponent;
  let fixture: ComponentFixture<DecoupageAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecoupageAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoupageAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
