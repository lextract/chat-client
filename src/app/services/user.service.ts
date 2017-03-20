import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { jwtHeader } from './jwtHelper';

//import { User } from '../_models/index';

const apiUrl = "api/users";
class User{
  id:number;
}

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get(apiUrl, jwtHeader()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(apiUrl + '/' + id, jwtHeader()).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post(apiUrl, user, jwtHeader()).map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.put(apiUrl + '/' + user.id, user, jwtHeader()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(apiUrl + '/' + id, jwtHeader()).map((response: Response) => response.json());
    }
}
