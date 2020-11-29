import { Component, OnInit } from '@angular/core';
import { GenericService } from 'src/app/service/generic.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public details;
  userList;
  
  constructor(private service: GenericService, private router: Router,
  private route: ActivatedRoute) { }

  ngOnInit() {
    // To get the user details.
    this.details = this.service.getUserDetails();
  }

  
  onEditClick(detail) {
    this.router.navigate(['edit-user/'+detail.email]);
  }

// Method to delete the user
delete(id) {
    console.log(this.userList)
    console.log(this.details)
    this.details.splice(id, 1);
  }


 //Method to logout the user.
 logOut() { 
  this.service.setLogIn(false);
  this.service.setRegisterSuccess(false);
  this.router.navigate(['login']);
}


}
