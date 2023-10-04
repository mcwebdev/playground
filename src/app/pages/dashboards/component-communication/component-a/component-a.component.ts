import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-component-a',
  templateUrl: './component-a.component.html',
  styleUrls: ['./component-a.component.scss']
})
export class ComponentAComponent implements OnInit {
  message: string = 'Initial message';

  constructor(public sharedService: SharedServiceService) { }

  ngOnInit() {
    this.sharedService.message$.subscribe(msg => this.message = msg);
  }
}
