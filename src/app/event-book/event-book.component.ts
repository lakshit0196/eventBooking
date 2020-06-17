import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { EventsServiceService } from '../events-service.service';

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

  }

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
  onSubmit() {
    console.log(this.eventAttendeeObj);
  }
  fillSeatsArr(num) {
    this.seatsArray = [];
    for (let i = 2; i <= num; i++) {
      this.seatsArray.push(i);
    }
  }

}
