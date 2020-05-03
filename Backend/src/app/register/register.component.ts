import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { User } from "../models/user";
import { AuthService } from '../services/auth.service';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private authService:AuthService) {}

  user: any = {};
  userForm: FormGroup;

  createUserForm() {
    this.userForm = this.formBuilder.group({
      userName: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.createUserForm();
  }

  login(){
    console.log(this.user)
    this.authService.login(this.user);
  }

  logOut(){
    this.authService.logOut();
  }

  get isAuthenticated(){
    return this.authService.loggedIn();
  }

  add(){
    console.log("qweqwe")
  }
}
