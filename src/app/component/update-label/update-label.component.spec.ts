import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLabelComponent } from './update-label.component';

describe('UpdateLabelComponent', () => {
  let component: UpdateLabelComponent;
  let fixture: ComponentFixture<UpdateLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
