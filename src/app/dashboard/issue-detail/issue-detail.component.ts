import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router'
import { IssueService } from 'src/app/issue.service';
import { UserService } from 'src/app/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.css']
})
export class IssueDetailComponent implements OnInit {
  public issueId:string;
  public userDetail;
  public issueDetail:any;
  public comments:any;
  public newComment:string;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private issueService:IssueService,
    private userService:UserService,
    private toastr:ToastrService
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
          this.comments = apiresponse['data']['comments']
          //console.log(this.comments)
        },
        (error)=>
        {
          console.log(error)
        }
      )
    }
  }

  //adding new comment
  public addComment()
  {
    if(this.newComment)
    {

      let data=
      {
        comment:this.newComment,
        userId:this.userDetail.userId,
        firstName:this.userDetail.firstName,
        authToken:this.userDetail.authToken,
        issueId:this.issueId
      }

      //calling service function for adding comment
      this.issueService.addComment(data).subscribe(
        (apiresponse)=>
        {
          if(apiresponse['status']===200)
          {
            this.toastr.success('comment added');
            //console.log(apiresponse)
            this.comments.push(apiresponse['data'])
            //this.getIssueDetail()
          }
          else
          {
            this.toastr.error(apiresponse['message'])
          }
        },
        (error)=>
        {
          console.log(error)
        }
      )
    }
  }

  //adding comment by keypress enter
  public addCommentByKeyPress(event)
  {
    if(event.keyCode === 13)
    {
      this.addComment()
    }
  }

}
