import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tableau1Component } from './tableau1.component';

describe('Tableau1Component', () => {
  let component: Tableau1Component;
  let fixture: ComponentFixture<Tableau1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tableau1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tableau1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
