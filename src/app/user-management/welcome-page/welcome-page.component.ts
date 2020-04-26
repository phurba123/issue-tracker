import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  public loginEmail: string;
  public loginPassword: string;
  public firstName: any;
  public lastName: any;
  public mobileNumber: number;
  public signupEmail: string;
  public signupPassword: string;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    //maintaining session from local storage
    if (this.userService.getUserDetailsFromLocalStorage()) {
      this.router.navigate(['/home'])
    }
  }

  //login function
  public login() {
    if (!this.loginEmail) {
      this.toastr.warning('Enter email')
    }
    else if (!this.loginPassword) {
      this.toastr.warning('Enter password')
    }
    else {
      this.userService.login(this.loginEmail, this.loginPassword).subscribe(
        (apiresponse) => {
          if (apiresponse['status'] === 200) {
            //this.toastr.success('login successfull');
            console.log(apiresponse)

            //set user details on local storage
            let data =
            {
              authToken: apiresponse['data']['authToken'],
              userId: apiresponse['data']['userDetails']['userId'],
              firstName: apiresponse['data']['userDetails']['firstName']
            }
            this.userService.setUserDetailsOnLocalStorage(data);
            // end of setting userdetails on local storage

            //navigate to home page after logging successfully
            setTimeout(() => {
              this.router.navigate(['/home'])
            }, 100);

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
    }
  }//end of login funcion

  public signUp() {
    if (!this.firstName) {
      this.toastr.warning('Enter firstName')
    }
    else if (!this.lastName) {
      this.toastr.warning('Enter lastName');
    }
    else if (!this.mobileNumber) {
      this.toastr.warning('Enter mobileNumber')
    }
    else if (!this.signupEmail) {
      this.toastr.warning('Enter email');
    }
    else if (!this.signupPassword) {
      this.toastr.warning('Enter password')
    }
    else {
      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.signupEmail,
        password: this.signupPassword,
        mobileNumber: this.mobileNumber
      }
      this.userService.signUp(data).subscribe(
        (apiresponse) => {
          if (apiresponse['status'] === 200) {
            this.toastr.success('signup successfull');


            //cleanup input fields
            this.router.navigate(['/welcome'])
            /** this.firstName = '';
             this.lastName = '';
             this.signupEmail = '';
             this.signupPassword = '';
             this.mobileNumber = null;*/
          }
          else {
            this.toastr.error(apiresponse['message'])
            console.log(apiresponse)
          }
        },
        (error) => {
          setTimeout(() => {
            this.router.navigate(['/server/error'])
          }, 2000);
        }
      )
    }
  }


}
