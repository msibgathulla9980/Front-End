
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../core/service/user.service';
import { MatSnackBar } from '@angular/material';
import { User } from '../../../core/model/user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  hide = true;
  public user: User[] = [];


  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private userService: UserService, private router: Router,
              public snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      emailId: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  get f() { return this.loginForm.controls; }

  onSubmit(user) {
    this.submitted = true;
    if (this.loginForm.invalid) {
      console.log('Invalid');
    }
    this.userService.login(user).subscribe(response => {
      console.log('login successfull');
      console.log(user);
      localStorage.setItem('token', response.headers.get('token'));
      this.router.navigate(['/homepage']);
    },
      (error) => {
        console.log(error);
        this.snackBar.open('Invalid details or Please activate your account', 'please enter the valid details', {
          duration: 2000,
        });
      });
  }
}

