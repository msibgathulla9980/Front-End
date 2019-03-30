// We import all the angular testing tools that we are going to use.
// We import all the dependencies that this component has.

import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

// We use a “describe” to start our test block with the title matching the 
// tested component name.
describe('AppComponent', () => {

  // We use an async before each. The purpose of the async is to
  // let all the possible asynchronous code to finish before continuing.
  beforeEach(async(() => {

    // Before running any test in angular you need to configure an angular test bed.
    // This allows you to create an angular environment for the component being tested
    TestBed.configureTestingModule({
      imports: [
        // // Any module, component or service that your tested component
        // needs have to be included in the test bed
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      // after setting the configuration, you call the compile components function.
    }).compileComponents();
  }));

  it('should create the app', () => {
    // First we need to have an instance of the app.component,
    // for that we use the create component function of angular test bed
    const fixture = TestBed.createComponent(AppComponent);
    // as a result, we get a fixture object
    // that is going to allows us to create an instance of that component.
    const app = fixture.debugElement.componentInstance;
    // we have an instance of app.component we can check the value in the text property 
    // an make a jasmine expect to be equal to the expected value.
    expect(app).toBeTruthy();
  });
  // In the first test, we are checking that the component
  // actually contains the expected text in the “title” property.
  it(`should have as title 'Fundoo Keep'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Fundoo Keep');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to Fundoo Keep');
  });
});
