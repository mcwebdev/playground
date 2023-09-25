import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,

  //  OnPush Change Detection Strategy:
  //  With the OnPush strategy, Angular only checks for changes if the component's 
  //  input properties (@Input) change, or if an event bound with @Output emits an event. 
  //  This can lead to significant performance improvements, especially in applications 
  //  with complex component trees or heavy rendering.
})
export class ChildComponent {
  code: any;
  constructor() {
    this.code = `
    // When using changeDetection: ChangeDetectionStrategy.OnPush, the component will only be
    // updated when the input reference changes. You can not update the input object properties and expect
    // the component to be updated. You need to create a new object and assign it to the input
    // property. This is because the OnPush strategy will only check for reference changes, not
    // property changes.
    
    // if you were to setup breakpoints on the code below, you would observe 
    // => this.message.text = 'Updated message'; 
    // however you will not see it render in the view because you did not update the object reference.
    // You only updated the object properties. ChangeDetectionStrategy.OnPush requires you update the
    // object reference in order for the strategy ".OnPush" to instantiate and update DOM.

     message = {
          text: 'Initial message',
          timestamp: new Date('2023-08-09 11:00:00'),
      };

    // incorrect
     updateMessage() {
          this.message.text = 'Updated message';
          this.message.timestamp = new Date();
     }
    
    //correct
    updateMessage() {
    this.message = {        
        // use the ... operator to copy the properties of the old 
        // object when merging properties not being updated.

        //...this.message,
        text: 'Updated message',
        timestamp: new Date(),
        };
    }
    `;
  }
  @Input() message: any;

}
