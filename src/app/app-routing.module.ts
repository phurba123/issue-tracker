import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomePageComponent } from './user-management/welcome-page/welcome-page.component';
import { HomeComponent } from './dashboard/home/home.component';
import { CreateComponent } from './dashboard/create/create.component';
import { NotfoundComponent } from './errors/notfound/notfound.component';


const routes: Routes = [
  {path:'welcome',component:WelcomePageComponent},
  {path:'',redirectTo:'welcome',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'create',component:CreateComponent},
  {path:'**',component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
