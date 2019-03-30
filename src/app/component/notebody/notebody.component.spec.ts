import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteBodyComponent } from './notebody.component';

describe('NoteBodyComponent', () => {
  let component: NoteBodyComponent;
  let fixture: ComponentFixture<NoteBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

