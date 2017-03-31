import { Component, OnInit } from '@angular/core';
import { ConversationService } from '../services/conversation.service';
import { UserService } from '../services/user.service';
import { Conversation } from '../models/Conversation';
import { Message } from '../models/Message';
import { User } from '../models/User';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit {
  creatingConv = false;
  currentConversation: Conversation;
  conversations: Conversation[] = [];
  messages: Message[] = [];
  newMessage: string = "";
  friends: User[] = [];
  constructor(
    private userService: UserService,
    private conversationService: ConversationService
  ) { }

  ngOnInit() {
    //this.conversations = this.conversationService.getMany();
    this.userService.getFriends().subscribe(friends => this.friends = friends);
    //this.conversationService.getAll().then(convs => this.conversations = convs);
    //this.conversationService.getAllOwn().subscribe(convs => this.conversations = convs);
  }
  showConv(id: number){
    console.log("cargando conversation: " + id);
    let conv = this.conversations.find(conv => conv.id == id);
    this.currentConversation = conv;
  }
  newConv(){
    this.creatingConv = true;
  }
  sendMessage(){
    // console.log("enviando mensaje: " + this.newMessage);
    if (!this.newMessage) return;
    let m = new Message();
    m.user = { name : "el quemao", id: 234 }; //this.userService.getCurrent();
    m.text = this.newMessage;
    this.messages.push(m);
    this.newMessage = "";
  }
  cancelNewConv(){
    this.creatingConv = false;
  }
  createConv(){
    let newConv = new Conversation();
    newConv.users = this.friends.filter(friend => friend.checked);
    this.currentConversation = newConv;
    newConv.title = newConv.users.map(u => u.name).join(", ");
    this.conversations.push(newConv);
    this.messages.splice(0);
    this.creatingConv = false;
    this.conversationService.create(newConv).subscribe(res => console.log("luego dre crear Conv: " + res))
  }
}
