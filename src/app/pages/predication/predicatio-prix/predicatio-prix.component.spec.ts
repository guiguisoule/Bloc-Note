import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredicatioPrixComponent } from './predicatio-prix.component';

describe('PredicatioPrixComponent', () => {
  let component: PredicatioPrixComponent;
  let fixture: ComponentFixture<PredicatioPrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredicatioPrixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredicatioPrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
