import { Component, OnInit } from '@angular/core';
// import { UserService } from 'src/app/user.service';
import {UserService} from '../../user.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private myAuth:string;

  constructor(
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.myAuth=this.userService.getUserDetailsFromLocalStorage().authToken;
    //console.log(this.myAuth)
  }

}
