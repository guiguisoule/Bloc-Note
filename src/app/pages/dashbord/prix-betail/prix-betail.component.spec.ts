import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrixBetailComponent } from './prix-betail.component';

describe('PrixBetailComponent', () => {
  let component: PrixBetailComponent;
  let fixture: ComponentFixture<PrixBetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrixBetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrixBetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
