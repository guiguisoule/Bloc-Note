import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDonnesComponent } from './detail-donnes.component';

describe('DetailDonnesComponent', () => {
  let component: DetailDonnesComponent;
  let fixture: ComponentFixture<DetailDonnesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailDonnesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailDonnesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
