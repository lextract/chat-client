import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { API_URL } from '../constants';
import { User } from '../models';
import * as roh from './requestOptionsHelper';

const endPoint = API_URL + '/auth';

@Injectable()
export class AuthService {

  constructor(private http: Http) { }

  login(email: string, password: string) {
    let url = endPoint + '?email=' + email + '&password=' + password;
    return this.http.get(url)
      .map(res => res.json())
      .catch(handleError);
  }
  signin(user: User) {
    return this.http.post(endPoint, JSON.stringify(user), roh.jsonHeader())
      .map(res => res.json())
      .catch(handleError);
  }

}

function handleError(error: Response | any) {
  // In a real world app, you might use a remote logging infrastructure
  let errorBody: any;
  let errMsg: string;
  if (error instanceof Response) {
    // TODO: validar si es JSON response
    errorBody = error.json() || '';
    const err = errorBody.error || JSON.stringify(errorBody);
    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  }
  // else {
  //   errMsg = error.message ? error.message : error.toString();
  // }
  return Observable.throw(errorBody);
}
