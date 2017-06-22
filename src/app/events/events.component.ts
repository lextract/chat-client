import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models';
import { EventService } from '../services/event.service';
import * as SessionCtrl from '../sessionCtrl';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  //styleUrls: ['./login.component.css']
})
export class EventsComponent implements OnInit {
  idEvent = 0;
  events = [];
  @Output() onEventPicked = new EventEmitter<number>();
  @Output() onCancel = new EventEmitter<any>();

  constructor(
    private router: Router,
    private eventSrv: EventService
  ) {
    this.listEvents();
  }
  listEvents() {
    this.eventSrv.getPublic().subscribe(events => {
      this.events = events;
    }, error => {
      console.log(error);
    })
  }
  cancel(){
    this.onCancel.emit();
  }
  invite(){
    this.onEventPicked.emit(this.idEvent);
  }
  eventChanged(idEvent: number){
    this.idEvent = idEvent;
  }
  ngOnInit() { }
}
