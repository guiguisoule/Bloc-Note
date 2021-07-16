import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationOffresComponent } from './validation-offres.component';

describe('ValidationOffresComponent', () => {
  let component: ValidationOffresComponent;
  let fixture: ComponentFixture<ValidationOffresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationOffresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationOffresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
