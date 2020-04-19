import { Component, OnInit } from '@angular/core';
// import { UserService } from 'src/app/user.service';
import {UserService} from '../../user.service'
import { IssueService } from 'src/app/issue.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private myAuth:string;
  public assignedIssues;
  private myInfo;
  private myId;

  constructor(
    private userService:UserService,
    private issueService : IssueService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.myInfo = this.userService.getUserDetailsFromLocalStorage();
    this.myAuth=this.myInfo.authToken;
    this.myId = this.myInfo.userId;
    //console.log(this.myAuth)
    this.getIssuesAssigned()
  }

  //getting issues assigned to user
  public getIssuesAssigned()
  {
    this.issueService.getIssuesAssigned(this.myId,this.myAuth).subscribe(
      (apiresponse)=>
      {
        this.assignedIssues = apiresponse['data'];
        //console.log('ass-issues : ',this.assignedIssues)
      },
      (error)=>
      {
        console.log(error)
      }
    )
  }//end of getting issues assigned

  //navigate to issue detail function
  public navigateToIssueDetail(issueId)
  {
    if(issueId)
    {
      this.router.navigate([`/issue/${issueId}/view`])
    }
  }
}
