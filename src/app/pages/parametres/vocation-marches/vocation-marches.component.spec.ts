import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocationMarchesComponent } from './vocation-marches.component';

describe('VocationMarchesComponent', () => {
  let component: VocationMarchesComponent;
  let fixture: ComponentFixture<VocationMarchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VocationMarchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VocationMarchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
