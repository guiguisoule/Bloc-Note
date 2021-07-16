import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquetteursComponent } from './enquetteurs.component';

describe('EnquetteursComponent', () => {
  let component: EnquetteursComponent;
  let fixture: ComponentFixture<EnquetteursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnquetteursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquetteursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
