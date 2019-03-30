import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNoteComponent } from './updatenote.component';

describe('UpdateNoteComponent', () => {
  let component: UpdateNoteComponent;
  let fixture: ComponentFixture<UpdateNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
