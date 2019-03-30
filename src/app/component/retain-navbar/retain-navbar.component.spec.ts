import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetainNavbarComponent } from './retain-navbar.component';

describe('RetainNavbarComponent', () => {
  let component: RetainNavbarComponent;
  let fixture: ComponentFixture<RetainNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetainNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetainNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
