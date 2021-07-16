import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetailComponent } from './betail.component';

describe('BetailComponent', () => {
  let component: BetailComponent;
  let fixture: ComponentFixture<BetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
