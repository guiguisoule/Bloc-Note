import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffresVentesComponent } from './offres-ventes.component';

describe('OffresVentesComponent', () => {
  let component: OffresVentesComponent;
  let fixture: ComponentFixture<OffresVentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffresVentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffresVentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
