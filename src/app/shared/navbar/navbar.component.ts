import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private myAuth;
  public activeComp:string;

  @Input() active:string;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.userService.getUserDetailsFromLocalStorage())
    {
      this.myAuth = this.userService.getUserDetailsFromLocalStorage().authToken;
    }
    
    this.activeComp=this.active;
    //console.log(this.activeComp)
  }

  public logout() {
    // console.log(this.myAuth)
    this.userService.logout(this.myAuth).subscribe(
      (apiresponse) => {
        if (apiresponse['status'] === 200) {
          //remove userdetails from local storage 
          this.userService.removeUserDetailsFromLocalStorage();

          // navigate to welcome page after logging out
          this.router.navigate(['/welcome']);
        }
        else {
          console.log(apiresponse)
        }
      },
      (error) => {
        //handle error
      }
    )
  }

  //navigating home page
  public navigateHome()
  {
    //if current component is not home page then only navigate to home
    if(this.activeComp!='home')
    {
      this.router.navigate(['/home'])
    }
  }

}
