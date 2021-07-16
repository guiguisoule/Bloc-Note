import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffresAchatsComponent } from './offres-achats.component';

describe('OffresAchatsComponent', () => {
  let component: OffresAchatsComponent;
  let fixture: ComponentFixture<OffresAchatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffresAchatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffresAchatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
