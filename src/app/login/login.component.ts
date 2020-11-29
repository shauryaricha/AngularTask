import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericService } from '../service/generic.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginMessage: boolean;
  passwordWrong: boolean;
  emailNotExist: boolean;
  storeRegisterData: any;

  constructor(private router: Router, private service: GenericService) {}

  ngOnInit() {
    this.loginMessage = this.service.getRegisterSuccess();
    this.storeRegisterData = this.service.getLocalStorageData();
  }

  //Method to validate and login the user
  onLogin(data) {
    const emailExist = this.storeRegisterData.filter(x => x.email === data.email);
    if (emailExist.length === 0) {
      this.emailNotExist = true;
      this.passwordWrong = false;
    } else if (emailExist[0].password === data.password) {
      console.log('login success');
      this.service.setLogIn(true);
      this.router.navigate(['users']);
    } else {
      this.emailNotExist = false;
      this.passwordWrong = true;
    }
  }

  // Method to close the alert message
  close() {
    this.loginMessage = false;
    this.passwordWrong = false;
    this.emailNotExist = false;
  }
}



