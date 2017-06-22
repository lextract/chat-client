import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AuthService } from './services/auth.service';
import { ConversationService } from './services/conversation.service';
import { MessageService } from './services/message.service';
import { UserService } from './services/user.service';
import { EventService } from './services/event.service';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found.component';
import { LoginComponent } from './login/login.component';
import { MessengerComponent } from './messenger/messenger.component';
import { EventsComponent } from './events/events.component';


import { AppRoutingModule }     from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginComponent,
    MessengerComponent,
    EventsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule
  ],
  providers: [ AuthService, ConversationService, UserService, MessageService, EventService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
