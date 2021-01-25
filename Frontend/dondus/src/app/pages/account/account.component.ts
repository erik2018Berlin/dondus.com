import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../_services';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute,Router} from "@angular/router";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string;
  success:string;

  currentUser: any;

  constructor(private authenticationService: AuthenticationService,private formBuilder: FormBuilder,
              private route: ActivatedRoute,private router: Router,) {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
    console.log(this.currentUser);
    });
  }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    // show success message on registration
    if (this.route.snapshot.queryParams['registered']) {
      this.success = 'Registration successful';
    }


  }



  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.error = null;
    this.success = null;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

}
