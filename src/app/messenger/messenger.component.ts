import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
//import * as WebSo from 'ws';

import * as io from 'socket.io-client';

import { CHAT_URL } from '../constants';
import { ConversationService } from '../services/conversation.service';
import { UserService } from '../services/user.service';
import { MessageService } from '../services/message.service';
import { EventService } from '../services/event.service';

import { Message } from '../models/Message';
import { User, Conversation } from '../models';
import * as SessionCtrl from '../sessionCtrl';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit, OnDestroy {
  userName: string;
  creatingConv = false;
  currentConversation: Conversation;
  conversations: Conversation[] = [];
  messages: Message[] = [];
  newMessage: string = "";
  friends: User[] = [];
  chatSocket: any;
  timer: any;
  eventsShowed = false;

  constructor(
    private router: Router,
    private usersSrv: UserService,
    private convsSrv: ConversationService,
    private mesageSrv: MessageService,
    private eventSrv: EventService
  ) {
    this.userName = SessionCtrl.getUser().name;
    // TODO: fix machete!!!!!
    this.timer = setInterval(() => {
      this.convsSrv.getAll().subscribe(convs => this.conversations = convs);
      if (this.currentConversation)
        this.mesageSrv.getByConversation(this.currentConversation.id)
          .subscribe(messages => this.messages = messages);
    },7000);

  }

  ngOnInit() {
    this.convsSrv.getAll().subscribe(convs => this.conversations = convs);
    this.usersSrv.getFriends().subscribe(friends => this.friends = friends);
    //this.initlizeChatSocket();
  }
  ngOnDestroy() {
    clearInterval(this.timer);
  }
  showConv(id: number) {
    let conv = this.conversations.find(conv => conv.id == id);
    this.currentConversation = conv;
    this.mesageSrv.getByConversation(id).subscribe(messages => {
      this.messages = messages;
    })
  }
  newConv() {
    this.creatingConv = true;
  }
  sendMessage() {
    // console.log("enviando mensaje: " + this.newMessage);
    if (!this.newMessage) return;
    //this.chatSocket.send(this.newMessage);
    let m = new Message();
    m.idConversation = this.currentConversation.id;
    m.text = this.newMessage;
    // this.messages.push(m);
    this.mesageSrv.create(m).subscribe(message => {
      // TODO: ineficient way, fix!, replace for websocket
      this.showConv(this.currentConversation.id);
      this.convsSrv.getAll().subscribe(convs => this.conversations = convs);
    })
    this.newMessage = "";
  }
  cancelNewConv() {
    this.creatingConv = false;
  }
  createConv() {
    let newConv = new Conversation();
    let participants = this.friends.filter(friend => friend.checked);
    newConv.name = participants.map(u => u.name).join(", ");
    newConv.usersIds = participants.map(r => r.id).join(',');

    this.creatingConv = false;
    this.convsSrv.create(newConv).subscribe(conv => {
      //console.log("luego dre crear Conv: " + re);
      newConv.id = conv.id;
      this.currentConversation = newConv;
      this.conversations.push(newConv);
      this.messages.splice(0);
      this.convsSrv.getAll().subscribe(convs => this.conversations = convs);
    })
  }
  eventPicked(idEvent: number){
    if (idEvent){
      this.eventSrv.invite(this.currentConversation.id, idEvent)
        .subscribe(res => console.log(res), err => console.log(err));
    }
    this.eventsShowed = false;
  }
  cancelEventsPicker(){
    this.eventsShowed = false;
  }

  initlizeChatSocket() {
    // TODO:
    //let cli = SocketIO
    this.chatSocket = io('http://localhost:4499');
    // //socket.on('message')


    // // this.chatSocket = new WebSo(CHAT_URL);
    // //   // , {
    // //   //   headers: {
    // //   //     Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
    // //   //   }
    // //   // });
    this.chatSocket.on("message",(data) => {
      console.log("recibiendo datos WSS");
      console.log(data);
    })
  }
  logout() {
    SessionCtrl.remUser();
    this.router.navigate(['./login']);
  }
  showEvents(){
    this.eventsShowed = true;
  }
}
