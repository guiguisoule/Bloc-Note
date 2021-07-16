import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitAgricolsComponent } from './produit-agricols.component';

describe('ProduitAgricolsComponent', () => {
  let component: ProduitAgricolsComponent;
  let fixture: ComponentFixture<ProduitAgricolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduitAgricolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduitAgricolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
