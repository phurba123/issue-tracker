import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { IssueService } from 'src/app/issue.service';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers:[Location]
})
export class EditComponent implements OnInit {
  public title;
  public description;
  public assignees;
  public selectedStatus;
  public statusOptions=['backlog', 'in-progress', 'in-test', 'done'];
  public dropdownSelected='assign-to';
  private userDetail:any;
  public selectedAssignee;
  public allUsers;
  public issueId;
  public issueDetail;

  constructor(
    private userService:UserService,
    private issueService:IssueService,
    private router:Router,
    private route:ActivatedRoute,
    private location:Location
  ) { }

  ngOnInit(): void {
    this.userDetail = this.userService.getUserDetailsFromLocalStorage();
    this.issueId = this.route.snapshot.paramMap.get('issueId');
    this.getIssueDetail(this.issueId);
    //console.log(this.issueId)
  }

  //getting issue detail of passed issueId
  public getIssueDetail(issueId)
  {
    if(issueId)
    {
      this.issueService.getIssueDetail(issueId,this.userDetail.authToken).subscribe(
        (apiresponse)=>
        {
          if(apiresponse['status']===200)
          {
            this.issueDetail=apiresponse['data'];
            this.definePropertyValues(this.issueDetail);
          }
        }
      )
    }
  }

  //defining properties value of edit component for current issuedetail
  public definePropertyValues(issueDetail)
  {
    this.title=issueDetail.title;
    this.selectedStatus=issueDetail.status;
    this.description=issueDetail.description;
  }

  //getting all users
  public getAllUsers() {
    this.userService.getAllUsers(this.userDetail.authToken).subscribe(
      (apiresponse) => {
        //console.log(apiresponse)
        if (apiresponse['status'] === 200) {
          let allUsers = apiresponse['data'];
          this.removeAssigneeAndReporter(allUsers)
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }//end of getting all users

  public removeAssigneeAndReporter(allUsers)
  {
    //
  }

  public selectedUser(user)
  {
    //
  }

  public navigateBack()
  {
    this.location.back();
  }

  public editIssue()
  {
    //
  }

}
