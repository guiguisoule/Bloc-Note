import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Niveau1Component } from './niveau1.component';

describe('Niveau1Component', () => {
  let component: Niveau1Component;
  let fixture: ComponentFixture<Niveau1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Niveau1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Niveau1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
