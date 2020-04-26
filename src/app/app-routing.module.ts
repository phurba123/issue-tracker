import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomePageComponent } from './user-management/welcome-page/welcome-page.component';
import { HomeComponent } from './dashboard/home/home.component';
import { CreateComponent } from './dashboard/create/create.component';
import { NotfoundComponent } from './errors/notfound/notfound.component';
import { AllissuesComponent } from './dashboard/allissues/allissues.component';
import { MyReportsComponent } from './dashboard/my-reports/my-reports.component';
import { IssueDetailComponent } from './dashboard/issue-detail/issue-detail.component';
import { EditComponent } from './dashboard/edit/edit.component';
import { SearchViewComponent } from './dashboard/search-view/search-view.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { ForgotPasswordComponent } from './user-management/forgot-password/forgot-password.component';


const routes: Routes = [
  {path:'welcome',component:WelcomePageComponent},
  {path:'',redirectTo:'welcome',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'create',component:CreateComponent},
  {path:'issues',component:AllissuesComponent},
  {path:'reports',component:MyReportsComponent},
  {path:'issue/:issueId/view',component:IssueDetailComponent},
  {path:'issue/:issueId/edit',component:EditComponent},
  {path:'search/:searchText/view',component:SearchViewComponent},
  {path:'server/error',component:ServerErrorComponent},
  {path:'forgot/password',component:ForgotPasswordComponent},
  
  {path:'**',component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
