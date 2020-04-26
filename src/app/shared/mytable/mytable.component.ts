import { Component, OnInit, Input } from '@angular/core';
import { IssueService } from 'src/app/issue.service';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mytable',
  templateUrl: './mytable.component.html',
  styleUrls: ['./mytable.component.css']
})
export class MytableComponent implements OnInit {

  @Input() issueType: string;//string should be either of myissues,myreports,allissues,searchissues;
  @Input() searchText: string;

  public issues: any;//will hold records of issues based on type of current issue;
  public typeOfIssues: string;
  public userDetail;
  public myId;
  public myAuth;
  public caption: string;
  public pageValue = 0;
  public isTitleSorted = false;
  public isStatusSorted = false;
  public isReporterSorted = false;
  public isDateSorted = false;


  constructor(
    private issueService: IssueService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.userDetail = this.userService.getUserDetailsFromLocalStorage();
    this.myId = this.userDetail.userId;
    this.myAuth = this.userDetail.authToken;
    this.typeOfIssues = this.issueType;
    this.getIssues();
  }

  public getIssues() {
    if (this.typeOfIssues === 'myissues') {
      this.caption = 'List of issues assigned to you';
      this.getIssuesAssigned();
    }
    else if (this.typeOfIssues === 'allissues') {
      this.caption = 'List of all issues';
      this.getAllIssues();
    }
    else if (this.typeOfIssues === 'myreports') {
      this.caption = 'Issues reported by you';
      this.getReportedIssues();
    }
    else if (this.typeOfIssues === 'searchIssues') {
      if (this.searchText) {
        this.getSearchResult();
      }
    }
  }

  public getIssuesAssigned() {
    this.issueService.getIssuesAssigned(this.myId, this.myAuth, (this.pageValue * 6)).subscribe(
      (apiresponse) => {
        if (apiresponse['status'] === 200) {
          this.issues = apiresponse['data'];
        }
        else {
          this.pageValue--;
          this.toastr.warning('No more issues found');
        }

      },
      (error) => {
        setTimeout(() => {
          this.router.navigate(['/server/error'])
        }, 2000);
      }
    )
  }

  //getting all issues
  public getAllIssues() {
    if (this.myAuth) {
      this.issueService.getAllIssues(this.myAuth, (this.pageValue * 6)).subscribe(
        (apiresponse) => {
          if (apiresponse['status'] === 200) {
            this.issues = apiresponse['data'];
          }
          else {
            //if no message found on clicking next than retain the previous pageValue
            this.pageValue--;
            this.toastr.warning(apiresponse['message']);
          }
        },
        (error) => {
          setTimeout(() => {
            this.router.navigate(['/server/error'])
          }, 2000);
        }
      )
    }
  }//end of getAllIssues

  //getting issues reported by user
  public getReportedIssues() {
    this.issueService.IssuesReportedByUser(this.myId, this.myAuth, this.pageValue * 6).subscribe(
      (apiresponse) => {
        if (apiresponse['status'] === 200) {
          this.issues = apiresponse['data'];
        }
        else {
          this.pageValue--;
          this.toastr.warning(apiresponse['message']);
        }
      },
      (error) => {
        setTimeout(() => {
          this.router.navigate(['/server/error'])
        }, 2000);
      }
    )
  }

  //onclick next button 
  public nextPage() {
    this.pageValue++;
    this.getIssues()
    console.log(this.pageValue)
  }

  //onClick prev button
  public previousPage() {
    //if current page value is greater than 0 then only decrease pageValue,if its 0 than it will go to negative value
    if (this.pageValue > 0) {
      this.pageValue--;
      this.getIssues()
    }
  }

  //getting search result for search view
  public getSearchResult() {
    this.issueService.searchIssue(this.myAuth, this.searchText).subscribe(
      (apiresponse) => {
        if (apiresponse['status'] === 200) {
          //console.log(apiresponse)
          if (apiresponse['data'].length > 0) {
            this.issues = apiresponse['data']
          }
        }
        else {
          this.toastr.warning(apiresponse['message'])
        }
      },
      (error) => {
        setTimeout(() => {
          this.router.navigate(['/server/error'])
        }, 2000);
      }
    )
  }

  public navigateToIssueDetail(issueId) {
    this.router.navigate([`/issue/${issueId}/view`])
  }

  //sorting table
  public sortOnTitle() {

    if (!this.isTitleSorted) {
      this.issues.sort((a, b) => {
        //return a.title - b.title
        let x = a.title.toLowerCase();
        let y = b.title.toLowerCase();
        if (x < y) { return -1; }
        if (x > y) { return 1; }
        return 0;
      })
      this.isTitleSorted = true;
    }
    else {
      this.issues.sort((a, b) => {
        //return a.title - b.title
        let x = a.title.toLowerCase();
        let y = b.title.toLowerCase();
        if (x < y) { return 1; }
        if (x > y) { return -1; }
        return 0;
      })
      this.isTitleSorted = false;
    }

  }

  //sorting table on the basis of status
  public sortOnStatus() {
    if (this.isStatusSorted) {
      this.issues.sort((a, b) => {
        let x = a.status.toLowerCase();
        let y = b.status.toLowerCase();
        if (x < y) { return 1; }
        if (x > y) { return -1; }
        return 0;
      });
      this.isStatusSorted = false;
    }
    else {
      this.issues.sort((a, b) => {
        let x = a.status.toLowerCase();
        let y = b.status.toLowerCase();
        if (x < y) { return -1; }
        if (x > y) { return 1; }
        return 0;
      });
      this.isStatusSorted = true;
    }
  }

  //sorting table on the basis of reporter
  public sortOnReporter() {
    if (this.isReporterSorted) {

      this.issues.sort((a, b) => {
        let x = a.reporter.reporterName.toLowerCase();
        let y = b.reporter.reporterName.toLowerCase();
        if (x < y) { return 1; }
        if (x > y) { return -1; }
        return 0;

      })
      this.isReporterSorted = false;
    }
    else {
      this.issues.sort((a, b) => {
        let x = a.reporter.reporterName.toLowerCase();
        let y = b.reporter.reporterName.toLowerCase();
        if (x < y) { return -1; }
        if (x > y) { return 1; }
        return 0;

      })
      this.isReporterSorted = true;
    }
  }

  //sorting on the basis of date
  public sortOnDate() {
    if (this.isDateSorted) {
      this.issues.sort((a, b) => {
        let x = new Date(a.createdOn).getTime()
        let y = new Date(b.createdOn).getTime();

        if (x < y) { return 1 }
        if (x > y) { return -1 }
        return 0;

      })
      this.isDateSorted = false
    }
    else {
      //console.log(this.issues)
      this.issues.sort((a, b) => {
        let x = new Date(a.createdOn).getTime()
        let y = new Date(b.createdOn).getTime();

        if (x < y) { return -1 }
        if (x > y) { return 1 }
        return 0;

      })
      this.isDateSorted = true
    }
  }

}
