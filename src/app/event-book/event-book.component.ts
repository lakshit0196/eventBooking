import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { EventsServiceService } from '../events-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-event-book',
  templateUrl: './event-book.component.html',
  styleUrls: ['./event-book.component.scss']
})
export class EventBookComponent implements OnInit {
  public eventId = '';
  public eventList = [];
  public eventBookingObj: any = {};
  seatsArray;
  public eventAttendeeObj = {
    name: '',
    email: '',
    phone: '',
    seats: '',

  };
  public showerror = false;
  validEmail = true;
public isTicketBooked = false;
  constructor(private route: ActivatedRoute, private eventsService: EventsServiceService, ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      if (params.id) {
        this.eventId = params.id;
        this.eventsService.getEventsJSON().subscribe((res: any) => {
          this.eventList = res;
          this.eventBookingObj = {...this.eventList.find((x) => x.id.toString() === this.eventId.toString())};
        });

      }
    });
  }
  onSubmit(eventForm: NgForm) {
    // tslint:disable-next-line: max-line-length
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.validEmail = (re.test(this.eventAttendeeObj.email));
    if(!eventForm.valid || !this.eventAttendeeObj.seats || !this.validEmail) {
        this.showerror = true;
    } else {
      this.showerror = false;
      this.isTicketBooked = true;
    }
  }
  onPhoneKeyDown(event) {
    const RegExpression = new RegExp('^[0-9]+$');
    if (!(event.target.value + event.key).toString().match(RegExpression)) { event.preventDefault(); }
  }
  onKeyDown(event) {
    const RegExpression = /^[a-zA-Z\s]*$/;
    if (!(event.target.value + event.key).toString().match(RegExpression)) { event.preventDefault(); }
  }
  fillSeatsArr(num) {
    this.seatsArray = [];
    for (let i = 2; i <= num; i++) {
      this.seatsArray.push(i);
    }
  }

  public isSeatNotAvailable(): boolean {
   return this.eventBookingObj.seatsAvailable < this.eventAttendeeObj.seats
  }
}
