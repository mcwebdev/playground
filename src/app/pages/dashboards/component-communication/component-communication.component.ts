import { Component } from '@angular/core';

@Component({
  selector: 'app-component-communication',
  templateUrl: './component-communication.component.html',
  styleUrls: ['./component-communication.component.scss']
})
export class ComponentCommunicationComponent {
  code = `
  import { Injectable } from '@angular/core';
  import { BehaviorSubject, Observable } from 'rxjs';

  @Injectable({
    providedIn: 'root'
  })
  export class SharedServiceService {
    private messageSubject: BehaviorSubject<string> = new BehaviorSubject('Initial message');
    message$: Observable<string> = this.messageSubject.asObservable();

    constructor() { }

    updateMsg(newMessage: string) {
      this.messageSubject.next(newMessage);
    }
  }


  //component-a.component.ts
  export class ComponentAComponent implements OnInit {
    message: string = 'Initial message';

    constructor(public sharedService: SharedServiceService) { }

    ngOnInit() {
      this.sharedService.message$.subscribe(msg => this.message = msg);
    }
  }


  //component-b.component.ts
  <button (click)="sharedService.updateMsg('New message from Component B')">Update Message</button>
`
}
