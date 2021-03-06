import { Injectable } from '@angular/core';
import { Http, Jsonp, Response, URLSearchParams  } from '@angular/http';
import { Observable } from 'rxjs';

import { API_URL } from '../constants';
import { User } from '../models';
import * as roh from './requestOptionsHelper';

const endPoint = API_URL + '/user';

@Injectable()
export class UserService {
  constructor(
    private http: Http
  ) { }
  getFriends() {
    // TODO: con jwt el server conoce el id del usuario actual, devuelve la lista de amigos
    return this.http.get(endPoint, roh.jwtHeader())
      .map(res => res.json())
      .catch(handleError);
  }
}

function handleError(error: Response | any) {
  return Observable.throw("errMsg User Service");
}
