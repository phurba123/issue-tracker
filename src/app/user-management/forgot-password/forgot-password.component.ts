import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  public email: any;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public resetPassword() {
    if (!this.email) {
      this.toastr.warning('Enter email for resetting password')
    }
    else {
      this.userService.resetPassword(this.email).subscribe(
        (apiresponse) => {
          if (apiresponse['status'] === 200) {
            this.toastr.success('new password has been sent to your email');
            setTimeout(() => {
              this.router.navigate(['/welcome'])
            }, 1000);
          }
          else {
            this.toastr.warning(apiresponse['message'])
          }
        },
        (error) => {
          setTimeout(()=>
          {
            this.router.navigate(['/server/error']);
          },2000)
          
        }
      )
    }
  }

  public keyPressEvent(event) {
    if (event.keyCode === 13) {
      this.resetPassword()
    }
  }

}
