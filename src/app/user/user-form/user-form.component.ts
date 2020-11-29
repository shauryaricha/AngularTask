import { Component, OnInit } from '@angular/core';
import { GenericService } from 'src/app/service/generic.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  public isEditForm:boolean;
  public today = new Date();
  public user;
  public userMessage;
  public email;
  constructor(private service: GenericService,private route: ActivatedRoute,private router: Router) { }
  

  ngOnInit() {
    this.email = this.route.snapshot.params['email'];
    if(this.email){
      this.isEditForm=true;
     this.user= this.service.onGetUserByEmail(this.email);
    }else {
      this.isEditForm=false;
      this.user={};
    }
  }

  // Method to store and book the booking details
  onUserClick() { 
    if(this.isEditForm){
    this.service.onEdit(this.email,this.user);
    }else{
      this.service.onAdd(this.user);
    }
    this.userMessage = true;
    this.router.navigate(['/users']);
  
  }

 

  // Method to close the alert message
  close() {
    this.userMessage = false;
  }


}
