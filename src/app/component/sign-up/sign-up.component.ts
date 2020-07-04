import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../service/user/user.service';
import { User } from '../../entity/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  newUser: User;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private snackBar: MatSnackBar,
              private router: Router) {}

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      username: ['', Validators.required], password: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required], lastName: ['', Validators.required], email: ['', Validators.required]
    });
  }

  createUser() {
    this.newUser = new User(
      this.firstFormGroup.controls.username.value,
      this.firstFormGroup.controls.password.value,
      this.secondFormGroup.controls.firstName.value,
      this.secondFormGroup.controls.lastName.value,
      this.secondFormGroup.controls.email.value,
      new Date().getTimezoneOffset() / -60
    );

    this.userService.createUser(this.newUser).subscribe(response => {
      if (response.status >= 200 && response.status < 300) {
        this.showCompletedSnackBar('New account has been successfully created, re-directing to the login page.');
        this.router.navigate(['/sign-in']);
      } else {
        this.showCompletedSnackBar('There was an error creating your account. Try again later.');
      }
    });
  }

  showCompletedSnackBar(message: string) {
    this.snackBar.open(message, 'Dismiss', {
      duration: 7500,
    });
  }
}
