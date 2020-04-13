import { Component, OnInit } from '@angular/core';
import {UserService} from '../../user.service'

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  public loginEmail:string;
  public loginPassword:string;
  public firstName:any;
  public lastName:any;
  public mobileNumber:number;
  public signupEmail:string;
  public signupPassword:string;

  constructor(
    private userService:UserService
  ) { }

  ngOnInit() {
  }

  //login function
  public login()
  {
    console.log(this.loginEmail)
    if(!this.loginEmail)
    {
      //
    }
    else if(!this.loginPassword)
    {
      //
    }
    else
    {
      this.userService.login(this.loginEmail,this.loginPassword).subscribe(
        (apiresponse)=>
        {
          if(apiresponse['status']===200)
          {
            console.log('login successfull')
          }
          else{
            console.log('api : ', apiresponse)
          }
        },
        (error)=>
        {
          console.log(error)
        }
      )
    }
  }

}
