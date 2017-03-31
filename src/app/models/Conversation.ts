import { User } from './User';

let autoId = 0;

export class Conversation{
  // constructor(){
  //   this.id=autoId;
  //   autoId--;
  // }
  id: number;
  name: string;
  users: User[];
  title?: string = "";
  static create(): Conversation {
    autoId--;
    return {
      id: autoId,
      name: "",
      users: []
    }
  }
}
