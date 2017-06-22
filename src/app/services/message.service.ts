import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { API_URL } from '../constants';
import { Message } from '../models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as roh from './requestOptionsHelper';

const endPoint = API_URL + '/message';

@Injectable()
export class MessageService {
  constructor(private http: Http) { }

  getByConversation(idConv: number) {
    let url = endPoint + "?idConv=" + idConv;
    return this.http.get(url, roh.jwtHeader())
      .map(res => res.json())
      .catch(handleError);
  }

  create(message: Message) {
    message.idUser = parseInt(localStorage.getItem("userId"));
    return this.http.post(endPoint, message, roh.jwtAndJson())
      .map(res => res.json())
      .catch(handleError);
  }
}

function handleError(error: Response | any) {
  return Observable.throw("errMsg Message Service");
}

