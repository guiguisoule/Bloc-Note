import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntrantComponent } from './intrant.component';

describe('IntrantComponent', () => {
  let component: IntrantComponent;
  let fixture: ComponentFixture<IntrantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntrantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
