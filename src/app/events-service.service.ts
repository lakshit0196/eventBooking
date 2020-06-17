import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EventsServiceService {

  constructor(private http: HttpClient) {}

 getEventsJSON() {
    return this.http.get('/assets/events.json');
  }
}
