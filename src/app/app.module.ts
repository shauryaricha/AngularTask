import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { QuarryRegisterComponent } from './quarry-register/quarry-register.component';
import { VehicleTrackingComponent } from './components/vehicle-tracking/vehicle-tracking.component';
import { VechicleTrackingService } from './service/vechicleTracking.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    UserListComponent,
    UserComponent,
    UserFormComponent,
    QuarryRegisterComponent,
    VehicleTrackingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    VechicleTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
