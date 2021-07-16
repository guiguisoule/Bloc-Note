import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatOperationComponent } from './etat-operation.component';

describe('EtatOperationComponent', () => {
  let component: EtatOperationComponent;
  let fixture: ComponentFixture<EtatOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtatOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtatOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
