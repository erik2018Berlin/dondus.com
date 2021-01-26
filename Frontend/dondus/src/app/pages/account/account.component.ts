import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../_services';
import { AccountService } from "./../../_services";
import { FormGroup} from "@angular/forms";
import {FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  updateName: FormGroup;
  userName;
  userNameValue: string = '';
  loading = false;
  submitted = false;
  error: string;
  success:string;

  currentUser: any;

  constructor(private authenticationService: AuthenticationService,
              private accountService: AccountService)
  {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
      this.userName = this.currentUser.user.name;
    });
  }

  ngOnInit() {
    this.updateName = new FormGroup({
      'userName': new FormControl(this.userName,[Validators.required])
    });
  }

  onSubmit() {
    this.submitted = true;


    this.loading = true;
    this.userNameValue = this.name;
    this.accountService.updateUser_name(this.currentUser, this.userNameValue);
    this.loading = false;
  }


  // convenience getter for easy access to form fields
  get f() { return this.updateName.controls; }
  get name() { return this.updateName.get('userName').value; }


}
