import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/user.service';
import { IssueService } from 'src/app/issue.service';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [Location]
})
export class CreateComponent implements OnInit {
  public title: string;
  public description: string;
  public statusOptions = ['backlog', 'in-progress', 'in-test', 'done'];
  public selectedStatus;
  public selectedAssignee;
  private myAuth: any;
  private userDetail;
  public allUsersExcludingMe;
  public dropdownSelected: any = "assign-to";//for changing text of dropdown button dynamically;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    minHeight: '5rem',
    placeholder: 'Enter description...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      [
        'strikeThrough',
        'subscript',
        'superscript',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'indent',
        'outdent',
        'insertUnorderedList',
        'insertOrderedList',
        'heading',
        'fontName'
      ],
      [
        'fontSize',
        'textColor',
        'backgroundColor',
        'customClasses',
        'link',
        'removeFormat',
        'unlink',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'toggleEditorMode'
      ]
    ]
  };

  constructor(
    private location: Location,
    private toastr: ToastrService,
    private userService: UserService,
    private issueService: IssueService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userDetail = this.userService.getUserDetailsFromLocalStorage();
    this.myAuth = this.userDetail.authToken;
    this.getAllUsers()
  }

  //function for creating new issue
  public createIssue() {
    if (this.title && this.description && this.selectedStatus) {
      let data: any;

      // if assignee is selected then this data will be send
      if (this.selectedAssignee) {
        data =
          {
            title: this.title,
            status: this.selectedStatus,
            description: this.description,
            assigneeId: this.selectedAssignee.userId,
            assigneeName: this.selectedAssignee.firstName + " " + this.selectedAssignee.lastName,
            authToken: this.myAuth,
            reporterId: this.userDetail.userId,
            reporterName: this.userDetail.firstName  //stored in local storage
          };
      }
      // if not selected then this data will be sent
      else {
        data =
          {
            title: this.title,
            status: this.selectedStatus,
            description: this.description,
            authToken: this.myAuth,
            reporterId: this.userDetail.userId,
            reporterName: this.userDetail.firstName
          }

      }

      // make call to service for creating issue
      this.issueService.createIssue(data).subscribe(
        (apiresponse) => {
          if (apiresponse['status'] === 200) {
            //console.log(apiresponse)
            this.toastr.success('Issue created');
            let issueId = apiresponse['data']['issueId'];
            setTimeout(() => {
              this.router.navigate([`issue/${issueId}/view`])
            }, 1000)
          }
          else {
            this.toastr.error(apiresponse['message'])
          }

        },
        (error) => {
          setTimeout(() => {
            this.router.navigate(['/server/error'])
          }, 2000);
        }
      )
      //console.log(data)
    }
    else {
      this.toastr.warning('one or more field is missing')
    }
  }//end of creating issue

  //getting all users
  public getAllUsers() {
    this.userService.getAllUsers(this.myAuth).subscribe(
      (apiresponse) => {
        //console.log(apiresponse)
        if (apiresponse['status'] === 200) {
          let allUsers = apiresponse['data'];
          this.removeMyselfFromAllUsers(allUsers)
        }
      },
      (error) => {
        setTimeout(() => {
          this.router.navigate(['/server/error'])
        }, 2000);
      }
    )
  }//end of getting all users

  //removing myself from all users
  public removeMyselfFromAllUsers(allUsers) {
    allUsers.forEach((user, index) => {
      if (user.userId === this.userDetail.userId) {
        allUsers.splice(index, 1);
      }
    })

    this.allUsersExcludingMe = allUsers;
  }//end of removing myself from all users

  //userdetail of user selected from dropdown of assignees
  public selectedUser(user) {
    //change dropdownselcected button name to user selected name
    this.dropdownSelected = user.firstName;

    //initialize selectedAssignee
    this.selectedAssignee = user;
  }



  public navigateBack() {
    this.location.back()
  }

  public focused() {
    //console.log('focused')
  }

}
