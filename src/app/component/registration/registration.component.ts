import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { UserService } from '../../..//core/service/user.service';

// import { AlertService } from 'src/core/service/alert.service';
// import { AuthenticationService } from 'src/core/service/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    public snackBar: MatSnackBar
    // private alertService: AlertService,
    // private authenticationService: AuthenticationService,
  ) { }
  // redirect to home if already logged in
  //     if (this.authenticationService.currentUserValue) {
  //         this.router.navigate(['/']);
  //     }
  // }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      emailId: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      mobileNumber: ['', [Validators.required, Validators.minLength(10)]]
    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit(user) {
    this.submitted = true;
    this.userService.register(user);
    this.router.navigate(['/login']);
    this.snackBar.open('Mail has been to sent to your registered email', 'OK', {
      duration: 3000,
    });
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      console.log('Please Enter the valid details');
      this.snackBar.open('Please Enter the valid details', 'OK', {
        duration: 3000,
      });
    }

    console.log(user);
    this.userService.register(user).subscribe(response => {

      console.log(response);

      this.router.navigate(['/login']);
      this.snackBar.open('Mail has been to sent to your registered email', 'OK', {
        duration: 3000,
      });
      console.log(response.body.headers);
      localStorage.setItem('token', response.body.headers);

      console.log(response.body.headers);


    },
    (error) => console.log(error));
  }

  login() {
    this.router.navigate(['/login']);
  }
}
