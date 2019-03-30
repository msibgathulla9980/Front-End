
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../core/service/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../core/service/user.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-login',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotpasswordForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  hide = true;


  constructor(
    private formBuilder: FormBuilder, private route: ActivatedRoute, private userService: UserService, private router: Router,
    public snackBar: MatSnackBar
  ) { }


  ngOnInit() {
    this.forgotpasswordForm = this.formBuilder.group({
      emailId: ['', Validators.required]

    });
  }

  get f() { return this.forgotpasswordForm.controls; }
  onSubmit(emailId) {

    this.submitted = true;
    if (this.forgotpasswordForm.invalid) {
      console.log('Invalid');
    }
    console.log(emailId);

    this.userService.forgotPassword(emailId).subscribe(response => {
      localStorage.setItem('Authorization', response.headers.get('token'));
      console.log('Reset password initiated');
      this.snackBar.open('Mail has been to sent to your registered email', 'DONE', {
        duration: 3000,

      });

    },
      (error) => {
        console.log(error);
        console.log('Login failed');
        this.snackBar.open('Failed to send email', 'please enter the valid details', {
          duration: 2000,
        });
      });
  }
}
