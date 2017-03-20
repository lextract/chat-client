import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ConversationService } from './services/conversation.service';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found.component';
import { LoginComponent } from './login/login.component';
import { MessengerComponent } from './messenger/messenger.component';


import { AppRoutingModule }     from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginComponent,
    MessengerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ ConversationService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
