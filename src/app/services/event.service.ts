import { Injectable } from '@angular/core';
import { Http, Jsonp, Response, URLSearchParams  } from '@angular/http';
import { Observable } from 'rxjs';

import { API_URL } from '../constants';
import { User } from '../models';
import * as roh from './requestOptionsHelper';

const endPoint = API_URL + '/event';

@Injectable()
export class EventService {
  constructor(
    private http: Http
  ) { }
  getPublic() {
    return this.http.get(endPoint, roh.jwtHeader())
      .map(res => res.json())
      .catch(handleError);
  }
  invite(idConversation: number, idEvent: number){
    //let url = endPoint + "?idConv=" + idConversation  + "&idEvent=" + idEvent;
    let body = { idConversation: idConversation, idEvent: idEvent };
    return this.http.post(endPoint, body, roh.jwtAndJson())
      .map(res => res.json())
      .catch(handleError);
  }
}

function handleError(error: Response | any) {
  return Observable.throw("errMsg Event Service");
}
