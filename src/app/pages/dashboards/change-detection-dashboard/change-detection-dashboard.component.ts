import { Component } from '@angular/core';

@Component({
  selector: 'app-change-detection-dashboard',
  templateUrl: './change-detection-dashboard.component.html',
  styleUrls: ['./change-detection-dashboard.component.scss']
})
export class ChangeDetectionDashboardComponent {
  message = {
    text: 'Initial message',
    timestamp: new Date('2023-08-09 11:00:00'),
  };

  // When using changeDetection: ChangeDetectionStrategy.OnPush, the component will only be 
  // updated when the input reference changes. You can not update the input object and expect 
  // the component to be updated. You need to create a new object and assign it to the input
  // property. This is because the OnPush strategy will only check for reference changes, not
  // property changes.

  // updateMessage() {
  //   this.message.text = 'Updated message';
  //   this.message.timestamp = new Date();
  // }

  updateMessage() {
    this.message = {
      //...this.message, use the ... operator to copy the properties of the old object
      text: 'Updated message',
      timestamp: new Date(),
    };
  }
}
