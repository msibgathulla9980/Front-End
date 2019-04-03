import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteWithLabelComponent } from './note-with-label.component';

describe('NoteWithLabelComponent', () => {
  let component: NoteWithLabelComponent;
  let fixture: ComponentFixture<NoteWithLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteWithLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteWithLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
