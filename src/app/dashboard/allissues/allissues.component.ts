import { Component, OnInit } from '@angular/core';
import { IssueService } from 'src/app/issue.service';
import { UserService } from 'src/app/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allissues',
  templateUrl: './allissues.component.html',
  styleUrls: ['./allissues.component.css']
})
export class AllissuesComponent implements OnInit {
  public allIssues:any;
  public myAuth;
  public pageValue=0;

  constructor(
    private issueService:IssueService,
    private userService:UserService,
    private toastr:ToastrService,
    private router:Router
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
      this.issueService.getAllIssues(this.myAuth,(this.pageValue * 7)).subscribe(
        (apiresponse)=>
        {
          if(apiresponse['status']===200)
          {
            this.allIssues = apiresponse['data'];
          }
          else
          {
            //if no message found on clicking next than retain the previous pageValue
            this.pageValue--;
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

  //navigating to issue detail on row click
  public navigateToIssueDetail(issueId)
  {
    this.router.navigate([`issue/${issueId}/view`])
  }

  //onclick next button 
  public nextPage()
  {
    this.pageValue++;
    this.getAllIssues()
    console.log(this.pageValue)
  }

  //onClick prev button
  public previousPage()
  {
    //if current page value is greater than 0 then only decrease pageValue,if its 0 than it will go to negative value
    if(this.pageValue>0)
    {
      this.pageValue--;
      this.getAllIssues()
    }
  }

}
