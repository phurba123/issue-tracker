import { Component, OnInit } from '@angular/core';
// import { UserService } from 'src/app/user.service';
import { UserService } from '../../user.service'
import { SocketService } from 'src/app/socket.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private myAuth: string;
  public assignedIssues;
  private myInfo;
  private myId;
  public searchText:string;

  constructor(
    private userService: UserService,
    private socketService: SocketService,
    private toastr: ToastrService,
    private router:Router
  ) { }

  ngOnInit(): void {

    this.myInfo = this.userService.getUserDetailsFromLocalStorage();
    this.myAuth = this.myInfo.authToken;
    this.myId = this.myInfo.userId;

    this.verifyUser();
    //console.log(this.myAuth)

  }

  //verifying user
  public verifyUser() {
    this.socketService.verifyUser(this.myAuth, this.myId);
    this.listenForAuthError();
  }

  //listen for autherror
  public listenForAuthError() {
    this.socketService.listenForAuthError(this.myId).subscribe(
      (message) => {
        if (message === 'token valid') {
          //only if token is valid
          this.listenForUpdates()
        }
        else {
          this.toastr.error(message)
        }
      }
    )
  }
  //listen for updates
  public listenForUpdates() {
    this.socketService.listenForUpdates(this.myId).subscribe(
      (data) => {
        //console.log('data received: ',data)
        this.toastr.info(data.message).onTap.pipe().subscribe(()=>
        {
          this.router.navigate([`/issue/${data.issueId}/view`])
        })
      }
    )
  }//end of listening to updates

  //navigate to search view on searching for issues
  public searchField(event)
  {
    if(event.keyCode===13)
    {
      if(this.searchText)
      {
        this.router.navigate([`/search/${this.searchText}/view`])
      }
    }
  }

}
