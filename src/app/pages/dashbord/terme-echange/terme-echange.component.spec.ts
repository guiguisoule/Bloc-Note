import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermeEchangeComponent } from './terme-echange.component';

describe('TermeEchangeComponent', () => {
  let component: TermeEchangeComponent;
  let fixture: ComponentFixture<TermeEchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermeEchangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermeEchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
