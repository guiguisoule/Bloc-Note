import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheEtandueComponent } from './fiche-etandue.component';

describe('FicheEtandueComponent', () => {
  let component: FicheEtandueComponent;
  let fixture: ComponentFixture<FicheEtandueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheEtandueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheEtandueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
