import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodiciteMarcheComponent } from './periodicite-marche.component';

describe('PeriodiciteMarcheComponent', () => {
  let component: PeriodiciteMarcheComponent;
  let fixture: ComponentFixture<PeriodiciteMarcheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriodiciteMarcheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodiciteMarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
