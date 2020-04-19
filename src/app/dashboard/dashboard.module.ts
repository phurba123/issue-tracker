import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { CreateComponent } from './create/create.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AllissuesComponent } from './allissues/allissues.component';
import { MyReportsComponent } from './my-reports/my-reports.component';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';



@NgModule({
  declarations: [HomeComponent, CreateComponent, AllissuesComponent, MyReportsComponent, IssueDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule
  ]
})
export class DashboardModule { }
