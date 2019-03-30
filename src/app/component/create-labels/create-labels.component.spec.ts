import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLabelsComponent } from './create-labels.component';

describe('CreateLabelsComponent', () => {
  let component: CreateLabelsComponent;
  let fixture: ComponentFixture<CreateLabelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLabelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
