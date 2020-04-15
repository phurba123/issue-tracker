import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { CreateComponent } from './create/create.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [HomeComponent, CreateComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class DashboardModule { }
