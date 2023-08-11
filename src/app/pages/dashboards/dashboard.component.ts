import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class DashboardComponent {
  constructor() { console.log('DashboardComponent constructor'); }
}
