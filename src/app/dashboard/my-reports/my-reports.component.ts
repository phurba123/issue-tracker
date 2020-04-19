import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { IssueService } from 'src/app/issue.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-reports',
  templateUrl: './my-reports.component.html',
  styleUrls: ['./my-reports.component.css']
})
export class MyReportsComponent implements OnInit {
  public myReports:any;
  public userDetail:any;

  constructor(
    private userService:UserService,
    private issueService:IssueService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.userDetail=this.userService.getUserDetailsFromLocalStorage();
    this.IssueReportedByUser()
  }

  //getting issues reported by user
  public IssueReportedByUser()
  {
    this.issueService.IssuesReportedByUser(this.userDetail.userId,this.userDetail.authToken).subscribe(
      (apiresponse)=>
      {
        if(apiresponse['status']===200)
        {
          this.myReports=apiresponse['data'];
        }
        else
        {
          this.toastr.warning(apiresponse['message']);
        }
      },
      (error)=>
      {
        console.log(error)
      }
    )
  }//end of getting issues reported by user

}
