import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { AuthGuard } from './signup/auth-guard';
import { QuarryRegisterComponent } from './quarry-register/quarry-register.component';
import { VehicleTrackingComponent } from './components/vehicle-tracking/vehicle-tracking.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: SignupComponent
  },
  {
    path: 'add-user', component: UserFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users', component: UserListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-user/:email', component: UserFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'quarry', component: QuarryRegisterComponent
  },
  {
    path: 'vehicle-tracking', component: VehicleTrackingComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
