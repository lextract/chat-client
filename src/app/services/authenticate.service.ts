import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const apiUrl = "/rest/authenticate";

@Injectable()
export class AuthenticateService {

  constructor(private http: Http) { }

  login(username: string, password: string) {
    let postData = JSON.stringify({ username: username, password: password });
    return this.http.post(apiUrl, postData).map((response: Response) => {
      // login successful if there's a jwt token in the response
      let user = response.json();
      if (user && user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
    });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

}
