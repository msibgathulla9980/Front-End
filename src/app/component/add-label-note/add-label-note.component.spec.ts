import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLabelNoteComponent } from './add-label-note.component';

describe('AddLabelNoteComponent', () => {
  let component: AddLabelNoteComponent;
  let fixture: ComponentFixture<AddLabelNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLabelNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLabelNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
