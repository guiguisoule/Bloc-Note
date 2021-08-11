import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocNoteComponent } from './bloc-note.component';

describe('BlocNoteComponent', () => {
  let component: BlocNoteComponent;
  let fixture: ComponentFixture<BlocNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlocNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
