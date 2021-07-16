import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeAnimauxComponent } from './type-animaux.component';

describe('TypeAnimauxComponent', () => {
  let component: TypeAnimauxComponent;
  let fixture: ComponentFixture<TypeAnimauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeAnimauxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeAnimauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
