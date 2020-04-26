import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { MytableComponent } from './mytable/mytable.component';



@NgModule({
  declarations: [NavbarComponent, MytableComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    NavbarComponent,
    MytableComponent
  ]
})
export class SharedModule { }
