import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheSimbComponent } from './fiche-simb.component';

describe('FicheSimbComponent', () => {
  let component: FicheSimbComponent;
  let fixture: ComponentFixture<FicheSimbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheSimbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheSimbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
