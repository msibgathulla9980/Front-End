import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNoteComponent } from './main-note.component';

describe('MainNoteComponent', () => {
  let component: MainNoteComponent;
  let fixture: ComponentFixture<MainNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
