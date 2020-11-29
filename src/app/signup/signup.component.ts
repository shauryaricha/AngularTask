import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericService } from '../service/generic.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public storeRegisterData;
  public passwordError = false;
  public duplicateEmail = false;

  constructor(private router: Router, private service: GenericService) {}

  ngOnInit() {
    // Get the register data from the local storage
    this.storeRegisterData = this.service.getLocalStorageData();
  }

  // Method to validate and register the user details
  onRegister(data) {
    if (data.password !== data.cpassword) {
      this.passwordError = true;
    } else if (
      this.storeRegisterData.filter(item => item.email === data.email).length > 0) {
      this.passwordError = false;
      this.duplicateEmail = true;
    } else {
      this.storeRegisterData.push(data);
      localStorage.setItem('Register', JSON.stringify(this.storeRegisterData));
      this.service.setRegisterSuccess(true);
      this.router.navigate(['login']);
    }
  }

  // Method to close the alert message
  close() {
    this.duplicateEmail = false;
  }
  
}

