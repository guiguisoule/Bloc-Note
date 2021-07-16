import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationBetailComponent } from './presentation-betail.component';

describe('PresentationBetailComponent', () => {
  let component: PresentationBetailComponent;
  let fixture: ComponentFixture<PresentationBetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresentationBetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentationBetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
