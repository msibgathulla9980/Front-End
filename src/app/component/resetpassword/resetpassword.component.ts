import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../core/service/user.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetpasswordForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  hide = true;
  public id = this.route.snapshot.params.id;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private userService: UserService,
              public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.resetpasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmedpassword: ['', [Validators.required, Validators.minLength(8)]]

    });
  }

  get f() { return this.resetpasswordForm.controls; }

  onSubmit(user) {
    this.submitted = true;
    if (this.resetpasswordForm.invalid) {
      console.log(user);
    }

    if (this.resetpasswordForm.value.password !== this.resetpasswordForm.value.confirmedpassword) {
      this.snackBar.open('Passwords are not the same', 'please re-enter the passwords', {
        duration: 3000,
      });
     }

    this.userService.resetPassword(user, this.id).subscribe(response => {
      console.log('Password has been reset successfully');
      this.router.navigate(['/login']);
      this.snackBar.open('Password has been reset', 'DONE', {
        duration: 3000,
      });

    }, (error) => {
      console.log(error);
      console.log('Couldnot reset the password ');

      this.snackBar.open('Password couldnot be reset', 'DONE', {
        duration: 3000,
      });
    });
  }

}
