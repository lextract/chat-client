import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';

import { API_URL } from '../constants';
import { Conversation, User } from '../models';
import * as roh from './requestOptionsHelper';

const endPoint = API_URL + '/conversation';
const endPointUsers = API_URL + '/conversation/:id/users';

@Injectable()
export class ConversationService {
  constructor(private http: Http) { }

  getAll() {
    //let url = endPoint + "?idUser=" + localStorage.getItem("userId");
    return this.http.get(endPoint, roh.jwtHeader())
      .map(res => res.json())
      .catch(handleError);
  }

  create(conv: Conversation) {
    // TODO: set idCreator inside backend
    conv.idCreator = parseInt(localStorage.getItem("userId"));
    return this.http.post(endPoint, conv, roh.jwtAndJson())
      .map(res => res.json())
      .catch(handleError);
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
}

function handleError(error: Response | any) {
  return Observable.throw("errMsg Conversation Service");
}
