import { Component } from '@angular/core';

@Component({
  selector: 'app-ngrx-dashboard',
  templateUrl: './ngrx-dashboard.component.html',
  styleUrls: ['./ngrx-dashboard.component.scss']
})
export class NgrxDashboardComponent {
  constructor() {
    console.log('NgrxDashboardComponent constructor');
  }
}
