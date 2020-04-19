import { Component, OnInit } from '@angular/core';
import { IssueService } from 'src/app/issue.service';
import { UserService } from 'src/app/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-allissues',
  templateUrl: './allissues.component.html',
  styleUrls: ['./allissues.component.css']
})
export class AllissuesComponent implements OnInit {
  public allIssues:any;
  public myAuth;

  constructor(
    private issueService:IssueService,
    private userService:UserService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.myAuth=this.userService.getUserDetailsFromLocalStorage().authToken;
    this.getAllIssues()
  }

  //getting all issues
  public getAllIssues()
  {
    if(this.myAuth)
    {
      this.issueService.getAllIssues(this.myAuth).subscribe(
        (apiresponse)=>
        {
          if(apiresponse['status']===200)
          {
            this.allIssues = apiresponse['data'];
          }
          else
          {
            this.toastr.warning(apiresponse['message']);
          }
        },
        (error)=>
        {
          console.log(error);
        }
      )
    }
  }

}
