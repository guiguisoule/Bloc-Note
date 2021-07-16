import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeAlertesComponent } from './type-alertes.component';

describe('TypeAlertesComponent', () => {
  let component: TypeAlertesComponent;
  let fixture: ComponentFixture<TypeAlertesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeAlertesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeAlertesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
