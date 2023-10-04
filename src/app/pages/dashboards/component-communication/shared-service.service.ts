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
