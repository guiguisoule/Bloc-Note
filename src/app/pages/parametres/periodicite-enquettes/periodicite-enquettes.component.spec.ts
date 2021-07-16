import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodiciteEnquettesComponent } from './periodicite-enquettes.component';

describe('PeriodiciteEnquettesComponent', () => {
  let component: PeriodiciteEnquettesComponent;
  let fixture: ComponentFixture<PeriodiciteEnquettesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriodiciteEnquettesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodiciteEnquettesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
