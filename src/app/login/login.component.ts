import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models';
import { AuthService } from '../services/auth.service';
import * as SessionCtrl from '../sessionCtrl';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName = "";
  userEmail = "";
  userPass = "";
  showLogin = true;
  errorMessage = "";

  constructor(
    private router: Router,
    private authSrv: AuthService,
    //private cd: ChangeDetectorRef
  ) { }
  loginSubmit() {
    this.errorMessage = "";
    this.authSrv.login(this.userEmail, this.userPass).subscribe(user => {
      SessionCtrl.setUser(user);
      SessionCtrl.set('jwtToken',user.token);
      // let sUser = JSON.stringify(user);
      // localStorage.setItem('userId',user.id);
      // localStorage.setItem('user',sUser);
      this.router.navigate(['./messenger']);
    }, (error) => {
    this.errorMessage = "Nombre de usuario o contraseña incorrectos.";
    console.log(typeof error);
    console.log( error);

    })
  }
  signinSubmit() {
    this.errorMessage = "";
    let user: User = new User();
    user.name = this.userName;
    user.email = this.userEmail;
    user.password = this.userPass;
    this.authSrv.signin(user).subscribe(res => {
      this.loginSubmit();
    }, error => {
      this.errorMessage = "Error: datos inválidos";
    })
  }

  ngOnInit() { }
}
