import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { FormsModule} from '@angular/forms'


@NgModule({
  declarations: [WelcomePageComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class UserManagementModule { }
