import { Injectable } from '@angular/core';
import { Http, Jsonp, Response, URLSearchParams  } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/operator/map';
import { API_URL } from '../constants';
import { jwtHeader } from './jwtHelper';

import { User } from '../models';



@Injectable()
export class UserService {
  constructor(
    private http: Http,
    private jsonp: Jsonp
  ) { }
  getFriends(): Observable<User[]> {
    //return this.http.post('/api/users', user, this.jwt()).map((response: Response) => response.json());
    // TODO: con jwt el server conoce el id del usuario actual, devuelve la lista de amigos
    return this.http.get(API_URL + 'users').map(res => res.json());

    // return new Promise<User[]>((resolve)=> {
    //   //resolve(friends);
    //   let params = new URLSearchParams();
    // //params.set('search', term); // the user's search value
    // params.set('action', 'opensearch');
    // params.set('format', 'json');
    // params.set('callback', 'JSONP_CALLBACK');

    //   this.jsonp.get(apiUrl, { search: params }
    //   ).subscribe(res => {
    //     console.log(res);

    //     resolve(res.json());

    //   })
    // });

    //return
    // .subscribe((response: Response) => {
    //   console.log("LA GRAN PYTA MUERDA");
    //   console.log(response);
    //   let result = response.json();
    //   console.log(result);
    //   return result;
    // });//.catch(this.handleError);
  }
  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  // getAll() {
  //   return this.http.get(apiUrl, jwtHeader()).map((response: Response) => response.json());
  // }

  // getById(id: number) {
  //   return this.http.get(apiUrl + '/' + id, jwtHeader()).map((response: Response) => response.json());
  // }

  // create(user: User) {
  //   return this.http.post(apiUrl, user, jwtHeader()).map((response: Response) => response.json());
  // }

  // update(user: User) {
  //   return this.http.put(apiUrl + '/' + user.id, user, jwtHeader()).map((response: Response) => response.json());
  // }

  // delete(id: number) {
  //   return this.http.delete(apiUrl + '/' + id, jwtHeader()).map((response: Response) => response.json());
  // }
  // getCurrent() {
  //   return current;
  // }
}
let current: User = {
  id: 21,
  name: "Alex"
}

let friends: User[] = [
  { id: 11, name: "Goku" },
  { id: 12, name: "Alf" },
  { id: 12, name: "Homero" }
]

function handleError(error: Response | any) {
  // In a real world app, you might use a remote logging infrastructure
  let errMsg: string;
  if (error instanceof Response) {
    const body = error.json() || '';
    const err = body.error || JSON.stringify(body);
    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
  console.error(errMsg);
  return Observable.throw(errMsg);
}
