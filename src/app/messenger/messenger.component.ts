import { Component, OnInit } from '@angular/core';
import { ConversationService } from '../services/conversation.service';
import { Conversation } from '../models/Conversation';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit {
  currentConversation: Conversation;
  conversations: any[] = [];
  constructor(
    private conversationService: ConversationService
  ) { }

  ngOnInit() {
    this.conversations = this.conversationService.getMany();
  }

  showConversation(id: number){
    console.log("cargando conversation: " + id);
    this.currentConversation = {
      id: 121, name: "dadada", users: []
    }
    //this.conversationService.getById(1).subscribe
  }
  newConversation(){
    this.conversations.push({id: 111, name: "COÇNSNS 11"});
    console.log("numero: " + this.conversations.length);

  }
}
