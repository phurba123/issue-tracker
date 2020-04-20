import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { IssueService } from 'src/app/issue.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-reports',
  templateUrl: './my-reports.component.html',
  styleUrls: ['./my-reports.component.css']
})
export class MyReportsComponent implements OnInit {
  public myReports:any;
  public userDetail:any;
  public pageValue=0;

  constructor(
    private userService:UserService,
    private issueService:IssueService,
    private toastr:ToastrService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.userDetail=this.userService.getUserDetailsFromLocalStorage();
    this.IssueReportedByUser()
  }

  //getting issues reported by user
  public IssueReportedByUser()
  {
    this.issueService.IssuesReportedByUser(this.userDetail.userId,this.userDetail.authToken,this.pageValue*8).subscribe(
      (apiresponse)=>
      {
        if(apiresponse['status']===200)
        {
          this.myReports=apiresponse['data'];
        }
        else
        {
          this.pageValue--;
          this.toastr.warning(apiresponse['message']);
        }
      },
      (error)=>
      {
        console.log(error)
      }
    )
  }//end of getting issues reported by user

  public navigateToIssueDetail(issueId)
  {
    this.router.navigate([`issue/${issueId}/view`])
  }

  //onclick next button 
  public nextPage()
  {
    this.pageValue++;
    this.IssueReportedByUser()
    //console.log(this.pageValue)
  }

  //onClick prev button
  public previousPage()
  {
    //if current page value is greater than 0 then only decrease pageValue,if its 0 than it will go to negative value
    if(this.pageValue>0)
    {
      this.pageValue--;
      this.IssueReportedByUser()
    }
  }

}
