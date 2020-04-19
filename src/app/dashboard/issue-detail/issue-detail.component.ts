import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router'
import { IssueService } from 'src/app/issue.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.css']
})
export class IssueDetailComponent implements OnInit {
  public issueId:string;
  public userDetail;
  public issueDetail:any;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private issueService:IssueService,
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.issueId =this.route.snapshot.paramMap.get('issueId');
    this.userDetail=this.userService.getUserDetailsFromLocalStorage();
    this.getIssueDetail()
    //console.log(this.issueId)
  }

  //getting detail of issue
  public getIssueDetail()
  {
    if(this.issueId)
    {
      this.issueService.getIssueDetail(this.issueId,this.userDetail.authToken).subscribe(
        (apiresponse)=>
        {
          console.log(apiresponse)
          this.issueDetail = apiresponse['data']
        },
        (error)=>
        {
          console.log(error)
        }
      )
    }
  }

}
