import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  public baseUrl = "http://backend.issue-tracker.phursang.xyz/api/v1/issue";

  constructor(
    private http: HttpClient
  ) { }

  //creating issue
  public createIssue(data) {
    // if assigneeId and assigneeName is included then execute this else execute else part
    if (data.assigneeId && data.assigneeName) {
      console.log('!data.assignee')
      const params = new HttpParams()
        .set('authToken', data.authToken)
        .set('title', data.title)
        .set('description', data.description)
        .set('status', data.status)
        .set('assigneeId', data.assigneeId)
        .set('assigneeName', data.assigneeName)
        .set('reporterId', data.reporterId)
        .set('reporterName', data.reporterName)

      return this.http.post(`${this.baseUrl}/create`, params);
    }
    else {
      const params = new HttpParams()
        .set('authToken', data.authToken)
        .set('title', data.title)
        .set('description', data.description)
        .set('status', data.status)
        .set('reporterId', data.reporterId)
        .set('reporterName', data.reporterName)

      return this.http.post(`${this.baseUrl}/create`, params)
    }
  }//end of create issue

  //getting issues assigned to user
  public getIssuesAssigned(userId, authToken,skip) {
    return this.http.get(`${this.baseUrl}/${userId}/view/all?authToken=${authToken}&skip=${skip}`);
  }

  //getting all issues
  public getAllIssues(authToken, skip) {
    //console.log('from service : ',authToken)
    return this.http.get(`${this.baseUrl}/view/all?authToken=${authToken}&skip=${skip}`)
  }//end of getting all issues

  //get all issues reported by user
  public IssuesReportedByUser(userId, authToken, skip) {
    return this.http.get(`${this.baseUrl}/${userId}/reported/issues?authToken=${authToken}&skip=${skip}`);
  }

  //get issue detail by issueid
  public getIssueDetail(issueId, authToken) {
    return this.http.get(`${this.baseUrl}/${issueId}/view?authToken=${authToken}`)
  }//end

  //adding comments on issue
  public addComment(data) {
    const params = new HttpParams()
      .set('authToken', data.authToken)
      .set('userId', data.userId)
      .set('firstName', data.firstName)
      .set('comment', data.comment)
      .set('issueId', data.issueId)

    return this.http.post(`${this.baseUrl}/comment/create`, params)
  }

  //updating issue
  public updateIssue(data) {
    if (data.assigneeId && data.assigneeName) {
      const params = new HttpParams()
        .set('title', data.title)
        .set('description', data.description)
        .set('status', data.status)
        .set('assigneeId', data.assigneeId)
        .set('assigneeName', data.assigneeName)
        .set('authToken', data.authToken)

        return this.http.put(`${this.baseUrl}/${data.issueId}/edit`,params)
    }
    else
    {
      const params = new HttpParams()
        .set('title', data.title)
        .set('description', data.description)
        .set('status', data.status)
        .set('authToken', data.authToken)

        return this.http.put(`${this.baseUrl}/${data.issueId}/edit`,params)
    }

  }//end of updating issue

  //adding as watcher
  public addWatcher(data)
  {
    const params = new HttpParams()
    .set('authToken',data.authToken)
    .set('watcherId',data.watcherId)
    .set('watcherName',data.watcherName)

    return this.http.put(`${this.baseUrl}/${data.issueId}/add/watcher`,params);
  }

  //search for issue
  public searchIssue(authToken,searchText)
  {
    return this.http.get(`${this.baseUrl}/search/result?authToken=${authToken}&searchText=${searchText}`);
  }

}
