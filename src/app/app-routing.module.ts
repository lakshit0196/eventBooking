import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventBookComponent } from './event-book/event-book.component';
import { EventListComponent } from './event-list/event-list.component';


const routes: Routes = [
  {path : '', component: EventListComponent},
  {path : 'book/:id', component: EventBookComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
