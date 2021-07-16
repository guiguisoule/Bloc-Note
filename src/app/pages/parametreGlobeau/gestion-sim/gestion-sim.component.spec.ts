import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionSimComponent } from './gestion-sim.component';

describe('GestionSimComponent', () => {
  let component: GestionSimComponent;
  let fixture: ComponentFixture<GestionSimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionSimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionSimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
