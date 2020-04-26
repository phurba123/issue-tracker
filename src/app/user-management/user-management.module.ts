import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { FormsModule} from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [WelcomePageComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule
  ]
})
export class UserManagementModule { }
