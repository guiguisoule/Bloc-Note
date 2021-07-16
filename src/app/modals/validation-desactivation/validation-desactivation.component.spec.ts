import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationDesactivationComponent } from './validation-desactivation.component';

describe('ValidationDesactivationComponent', () => {
  let component: ValidationDesactivationComponent;
  let fixture: ComponentFixture<ValidationDesactivationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationDesactivationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationDesactivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
