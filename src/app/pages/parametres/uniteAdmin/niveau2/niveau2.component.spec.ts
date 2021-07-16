import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Niveau2Component } from './niveau2.component';

describe('Niveau2Component', () => {
  let component: Niveau2Component;
  let fixture: ComponentFixture<Niveau2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Niveau2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Niveau2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
