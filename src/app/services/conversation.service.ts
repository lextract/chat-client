import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';

import { API_URL } from '../constants';
import { jwtHeader } from './jwtHelper';
import { Conversation, User } from '../models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const endPoint = API_URL + 'conversations';
const endPointUsers = API_URL + 'conversations/:id/users';

@Injectable()
export class ConversationService {
  constructor(private http: Http) { }

  getAll() {
    //return this.http.get(apiUrl, jwtHeader()).map((response: Response) => response.json());
    return this.http.get(endPoint).map(res => res.json());
  }

  create(conv: Conversation) {
    // TODO: set de jwt token header
    return this.http.post(endPoint, conv).map(res => res.json());
  }

  /**
   * Agrega usuarios a una conversación en particular
   * @param idConv id de la conversación
   * @param idsUsers lista de los ids de usuarios que va agregar
   */
  addUsers(idConv: number, idsUsers: number[]){
    let url = endPointUsers.replace(":id", idConv.toString());
    return this.http.post(url, { idsUsers: idsUsers }).map(res => res.json());
  }

  /**
   * Abandona la conversación (no la elimina)
   * @param idConv id de la conversación
   */
  exit(idConv: number){
    // TODO: set de jwt token header
    let url = endPointUsers.replace(":id", idConv.toString());
    return this.http.delete(url).map(res => res.json());
  }


  // update(user: User) {
  //   return this.http.put(apiUrl + '/' + user.id, user, jwtHeader()).map((response: Response) => response.json());
  // }

  delete(id: number) {
    //return this.http.delete(endPoint + '/' + id, jwtHeader()).map(res => res.json());
    return this.http.delete(endPoint + '/' + id).map(res => res.json());
  }
}

// let convs: Conversation[] = [
//       { id: 101, name: "Conversation 1", users: [{id:123,name:"Al Hassem"}]},
//       { id: 102, name: "Conversation 2", users: [{id:123,name:"Mohamed"}]},
//       { id: 103, name: "Conversation 3", users: [{id:123,name:"Nostradamus"}]}
//     ]

//     ;


//let params = new URLSearchParams();
    // //params.set('search', term); // the user's search value
    // params.set('action', 'opensearch');
    // params.set('format', 'json');
    //params.set('callback', 'JSONP_CALLBACK');



  // getAllOwn(){
  //   let params = new URLSearchParams();
  //   params.set('callback', 'JSONP_CALLBACK');
  //   return this.http.get(apiUrl, { search: params }).map(res => res.json());
  // }

