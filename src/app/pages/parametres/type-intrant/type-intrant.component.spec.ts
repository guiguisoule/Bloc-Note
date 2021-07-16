import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeIntrantComponent } from './type-intrant.component';

describe('TypeIntrantComponent', () => {
  let component: TypeIntrantComponent;
  let fixture: ComponentFixture<TypeIntrantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeIntrantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeIntrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
