import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { jwtHeader } from './jwtHelper';


const apiUrl = "api/users";
class Conversation {
  id: number;
  name: string;
}

@Injectable()
export class ConversationService {
  constructor(private http: Http) { }

  getMany() {
    //return this.http.get(apiUrl, jwtHeader()).map((response: Response) => response.json());
    let convs: Conversation[] = [
      { id: 101, name: "Conversation 1"},
      { id: 102, name: "Conversation 2"},
      { id: 103, name: "Conversation 3"}
    ]
    return convs;
  }

  getById(id: number) {
    this.http.get("ksks")
    return this.http.get(apiUrl + '/' + id, jwtHeader()).map((response: Response) => response.json());
  }

  // create(user: User) {
  //   return this.http.post(apiUrl, user, jwtHeader()).map((response: Response) => response.json());
  // }

  // update(user: User) {
  //   return this.http.put(apiUrl + '/' + user.id, user, jwtHeader()).map((response: Response) => response.json());
  // }

  // delete(id: number) {
  //   return this.http.delete(apiUrl + '/' + id, jwtHeader()).map((response: Response) => response.json());
  // }
}
