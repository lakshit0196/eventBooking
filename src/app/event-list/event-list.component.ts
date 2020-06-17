import { Component, OnInit } from '@angular/core';
import { EventsServiceService } from '../events-service.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  public eventList = [];
  public eventListFilterArr = [];

  public searchText = '';

  constructor(
    private eventsService: EventsServiceService,
  ) { }

  ngOnInit() {
    this.eventsService.getEventsJSON().subscribe((res: any) => {
      this.eventList = res;
      this.eventListFilterArr = [...this.eventList];
    });
  }
  onSearchTextChange() {
    if (this.searchText) {
      this.eventListFilterArr = this.eventList.filter((e) => {
        return (e.name.toString().toLowerCase().includes(this.searchText.toString().toLowerCase()));
      });
    } else {
      this.eventListFilterArr = this.eventList;
    }
    console.log(this.eventListFilterArr);
  }

}
