import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
  //  OnPush Change Detection Strategy:
  //  With the OnPush strategy, Angular only checks for changes if the component's 
  //  input properties (@Input) change, or if an event bound with @Output emits an event. 
  //  This can lead to significant performance improvements, especially in applications 
  //  with complex component trees or heavy rendering.
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent {

  constructor() { }
  @Input() message: any;

}
