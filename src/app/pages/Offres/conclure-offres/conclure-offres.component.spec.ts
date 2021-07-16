import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConclureOffresComponent } from './conclure-offres.component';

describe('ConclureOffresComponent', () => {
  let component: ConclureOffresComponent;
  let fixture: ComponentFixture<ConclureOffresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConclureOffresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConclureOffresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
