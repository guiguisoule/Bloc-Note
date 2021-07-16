import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDroitsComponent } from './gestion-droits.component';

describe('GestionDroitsComponent', () => {
  let component: GestionDroitsComponent;
  let fixture: ComponentFixture<GestionDroitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionDroitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionDroitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
