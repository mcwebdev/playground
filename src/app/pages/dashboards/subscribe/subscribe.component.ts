import { Component } from '@angular/core';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent {
  observable: string = `// Import the Observable class and the of function from RxJS
import { Observable, of } from 'rxjs';

// Create an Observable that emits the numbers 1 through 5
const sourceObservable = of(1, 2, 3, 4, 5);

// Subscribe to the Observable
sourceObservable.subscribe({
  next: value => console.log('Next value:', value),  // Called on each value emitted
  error: error => console.error('Error:', error),     // Called if there is an error
  complete: () => console.log('Complete')             // Called once the Observable is complete
});

// Console Output:
// Next value: 1
// Next value: 2
// Next value: 3
// Next value: 4
// Next value: 5
// Complete
`;
}
