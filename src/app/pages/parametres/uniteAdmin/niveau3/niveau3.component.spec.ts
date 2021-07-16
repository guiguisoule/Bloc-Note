import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Niveau3Component } from './niveau3.component';

describe('Niveau3Component', () => {
  let component: Niveau3Component;
  let fixture: ComponentFixture<Niveau3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Niveau3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Niveau3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
