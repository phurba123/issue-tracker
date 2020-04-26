import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public baseUrl="http://backend.issue-tracker.phursang.xyz/api/v1/user";

  constructor(
    private http:HttpClient
  ) { }

  /**
   * User Management
   */

  // login service
  public login(email,password):Observable<any>
  {
    let params = new HttpParams()
    .set('email',email)
    .set('password',password);

    return this.http.post(`${this.baseUrl}/signin`,params);
  }
  // end of login

  //signup service
  public signUp(data)
  {
    const params = new HttpParams()
    .set('firstName',data.firstName)
    .set('lastName',data.lastName)
    .set('email',data.email)
    .set('password',data.password)
    .set('mobileNumber',data.mobileNumber)

    return this.http.post(`${this.baseUrl}/signup`,params);
  }

  //logout
  public logout(authToken)
  {
    const params = new HttpParams().set('authToken',authToken)
    return this.http.post(`${this.baseUrl}/signout`,params);
  }

  //getting all users
  public getAllUsers(authToken)
  {
    return this.http.get(`${this.baseUrl}/view/all?authToken=${authToken}`);
  }

  //resetting passoword
  public resetPassword(email)
  {
    let data ={};
    return this.http.post(`${this.baseUrl}/${email}/forgotpassword`,data)
  }

  /**
   * End of User Management
   */

   /**
    * use of Local storage
    */

    //set user details on local storage
    public setUserDetailsOnLocalStorage(data)
    {
      localStorage.setItem('userDetails',JSON.stringify(data));
    }

    //get user details 
    public getUserDetailsFromLocalStorage()
    {
      return JSON.parse(localStorage.getItem('userDetails'));
    }

    //remove userDetails
    public removeUserDetailsFromLocalStorage()
    {
      localStorage.removeItem('userDetails');
    }

    /**
     * End of use of Local Storage
     */
}
