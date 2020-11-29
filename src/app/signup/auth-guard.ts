import { Injectable } from '@angular/core';
import { CanActivate, Router, CanDeactivate } from '@angular/router';
import { GenericService } from '../service/generic.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private service: GenericService) {}

  // Method to gaurd the route
  canActivate(): boolean  {
    if (this.service.getLogIn()) {
     return true;
    } else {
      alert('Please login for booking details!!');
      this.router.navigate(['login']);
    }
  }
}
