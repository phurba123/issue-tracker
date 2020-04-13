import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public baseUrl="http://localhost:3200/api/v1/user";

  constructor(
    private http:HttpClient
  ) { }

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
}
