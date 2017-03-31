import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { jwtHeader } from './jwtHelper';
import { Conversation} from '../models/Conversation';


const apiUrl = "api/message";

@Injectable()
export class MessageService {
  constructor(private http: Http) { }

  getByConversation(idConv: number){
    return new Promise<Conversation[]>((resolve)=> {
      resolve(convs);
    });
  }

}

let convs: Conversation[] = [
      { id: 101, name: "Conversation 1", users: [{id:123,name:"Al Hassem"}]},
      { id: 102, name: "Conversation 2", users: [{id:123,name:"Mohamed"}]},
      { id: 103, name: "Conversation 3", users: [{id:123,name:"Nostradamus"}]}
    ]

    ;
