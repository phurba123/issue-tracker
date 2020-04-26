import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SocketService } from 'src/app/socket.service';

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
    private router: Router,
    private toastr:ToastrService,
    private socketService:SocketService
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

          //disconnect socket
          this.socketService.exitSocket();

          // navigate to welcome page after logging out
          this.router.navigate(['/welcome']);
        }
        else {
          //console.log(apiresponse)
          this.toastr.warning(apiresponse['message'])
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
