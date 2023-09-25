import { Component, OnInit } from '@angular/core';
import {
  Observable, combineLatest, asyncScheduler, queueScheduler, asapScheduler, observeOn, subscribeOn,
  Subject, timer, Subscription, takeUntil, map, startWith
} from 'rxjs';

@Component({
  selector: 'app-rxjs-dashboard',
  templateUrl: './rxjs-dashboard.component.html',
  styleUrls: ['./rxjs-dashboard.component.scss']
})
export class RxjsDashboardComponent {

  code: string;
  code1: string;
  code2: string;
  code3: string;
  code4: string;
  code5: string;
  code6: string;
  code7: string;
  code8: string;
  code9: string;

  outputMessage: string[] = [];
  scheduler: string;
  stopwatch: string;
  completed: string = "";

  public elapsedTime: number = 0;
  public isPaused: boolean = true;  // Assuming the stopwatch starts in a paused state
  private stop$ = new Subject<void>();
  private timerSub: Subscription | undefined;

  constructor() {
    this.stopwatch = `
    
    import {
      Observable, combineLatest, asyncScheduler, queueScheduler, asapScheduler, observeOn, subscribeOn,
      Subject, timer, Subscription, takeUntil, map, startWith
    } from 'rxjs';

    public elapsedTime: number = 0;
    public isPaused: boolean = true;
    private completed: string = "";

    private stop$ = new Subject<void>();
    private timerSub: Subscription | undefined;

    start() {
      this.completed = "";
      this.elapsedTime = 0;
      this.beginTimer();
    }

    private beginTimer() {
    
      const timer$ = timer(0, 1000);

      this.timerSub = timer$
        .pipe(
          takeUntil(this.stop$)
        )
        .subscribe(tick => {
          this.elapsedTime++;
        });
      this.isPaused = false;
    }

    pause() {
      this.isPaused = true;
      this.stop$.next();
    }

    unpause() {
      if (this.isPaused) {
        this.beginTimer();
      }
    }


    togglePause() {
      if (this.isPaused) {
        this.unpause();
      } else {
        this.pause();
      }
    }

    complete() {
      this.isPaused = true;
      this.stop$.next();
      if (this.timerSub) {
        this.timerSub.unsubscribe();
      }

      this.completed = "Timer has completed";
    }

    ngOnDestroy() {
      this.stop$.next();
      this.stop$.complete();
    }
    `;

    this.scheduler = `
  import { Observable, combineLatest, asyncScheduler, queueScheduler,
   asapScheduler, observeOn, subscribeOn } from 'rxjs';
    
    outputMessage: string[] = [];

  startObservables() {
    // Clear previous output messages from the UI
    this.outputMessage = [];
    
    // Create the first observable using asyncScheduler to emit values 1, 2, 3 with delays
    const observable1 = new Observable((observer) => {
      // Log the start of observable1
      this.outputMessage.push('Starting observable1');

      // Schedule the emission of value 1 after 1 second
      asyncScheduler.schedule(() => {
        this.outputMessage.push('observable1: Emitting 1');
        observer.next(1); // Emit the value 1
      }, 1000);

      // Schedule the emission of value 2 after 2 seconds
      asyncScheduler.schedule(() => {
        this.outputMessage.push('observable1: Emitting 2');
        observer.next(2); // Emit the value 2
      }, 2000);

      // Schedule the emission of value 3 after 3 seconds and complete the observable
      asyncScheduler.schedule(() => {
        this.outputMessage.push('observable1: Emitting 3');
        observer.next(3); // Emit the value 3
        observer.complete(); // Complete the observable
      }, 3000);
    });

    // Create the second observable which emits values 'A', 'B', 'C' synchronously
    // but uses observeOn with queueScheduler to control the delivery context
    const observable2 = new Observable((observer) => {
      // Log the start of observable2
      this.outputMessage.push('Starting observable2');
      
      observer.next('A');
      observer.next('B');
      observer.next('C');
      observer.complete();
    }).pipe(
      // Use queueScheduler to control the execution context of this observable
      observeOn(queueScheduler)
    );

    // Combine observable1 and observable2 using combineLatest
    // and specify asapScheduler for notification delivery
    const combinedObservable = combineLatest([observable1, observable2]).pipe(
      observeOn(asapScheduler)
    );

    // Log the moment just before subscription
    this.outputMessage.push('Just before subscribing to combinedObservable');

    // Subscribe to the combined observable
    combinedObservable.pipe(
      // Use asapScheduler for the subscription itself
      subscribeOn(asapScheduler)
    ).subscribe({
      // Log received values
      next: (value) => {
        this.outputMessage.push('Received value: \${ JSON.stringify(value) } ');
      },
      // Log any errors
      error: (err) => {
        this.outputMessage.push('An error occurred: \${ err }');
      },
      // Log when the combined observable sequence is complete
      complete: () => {
        this.outputMessage.push('All done!');
      }
    });

    // Log the moment just after subscription
    this.outputMessage.push('Just after subscribing to combinedObservable');
  }`

    this.code = `
        import { of } from 'rxjs';
        import { mergeMap, delay } from 'rxjs/operators';

        of(1, 2, 3)
          .pipe(
            mergeMap(value => of(value).pipe(delay(1000)))
          )
          .subscribe(x => console.log(x));
          
        // Output will be:
        // 1
        // 2
        // 3
    `;

    this.code1 = `
        import { of } from 'rxjs';
        import { switchMap, delay } from 'rxjs/operators';

        of(1, 2, 3)
          .pipe(
            switchMap(value => of(value).pipe(delay(1000)))
          )
          .subscribe(x => console.log(x));

        // Output will be:
        // 3
    `;

    this.code2 = `
    // Imagine a situation where a user is typing into a search box, and for each key press, 
    // a search request is sent to the server. Using mergeMap: With mergeMap, all search 
    // requests will be made concurrently, and all results will be processed, potentially 
    // leading to outdated results being displayed. 

      import { fromEvent } from 'rxjs';
      import { mergeMap, map } from 'rxjs/operators';

      const searchBox = document.getElementById('search-box');

      fromEvent(searchBox, 'input')
        .pipe(
          mergeMap((event: any) => {
            const searchTerm = event.target.value;
            return fetch('/ search ? query = \${ searchTerm }').then(res => res.json());
          })
        )
        .subscribe(results => {
          // Handle and display the results
        });
    `;

    this.code3 = `
    // With switchMap, only the result of the latest search request will be processed, 
    // and any previous requests will be canceled.

      import { fromEvent } from 'rxjs';
      import { switchMap, map } from 'rxjs/operators';

      const searchBox = document.getElementById('search-box');

      fromEvent(searchBox, 'input')
        .pipe(
          switchMap((event: any) => {
            const searchTerm = event.target.value;
            return fetch('/ search ? query = \${ searchTerm }').then(res => res.json());
          })
        )
        .subscribe(results => {
          // Handle and display the latest results
        });
    `;

    this.code4 = `
    import { of } from 'rxjs';
    import { mergeMap } from 'rxjs/operators';

    // Simulated user ID
    const userId = '123';

    // Fetch user's basic information
    const user$ = of(userId).pipe(
      mergeMap(id => fetch('/ users / \${ id } ').then(res => res.json()))
    );

    // Fetch user's posts
    const posts$ = user$.pipe(
      mergeMap(user => fetch('/ posts ? userId = \${ user.id } ').then(res => res.json()))
    );

    // Fetch user's friends
    const friends$ = user$.pipe(
      mergeMap(user => fetch('/ friends ? userId = \${ user.id }').then(res => res.json()))
    );

    // Subscribe to all observables
    user$.subscribe(user => {
      // Handle user data
    });

    posts$.subscribe(posts => {
      // Handle posts data
    });

    friends$.subscribe(friends => {
      // Handle friends data
    });

    `;

    this.code5 = ` 
    import { fromEvent } from 'rxjs';
    import { debounceTime, switchMap } from 'rxjs/operators';

    // Listen to input events from a search box
    const searchBox = document.getElementById('search-box');
    fromEvent(searchBox, 'input')
      .pipe(
        debounceTime(300), // Wait for the user to stop typing for 300ms
        switchMap(event => fetch('/ search ? query = \${ event.target.value }')) // Make search request
      )
      .subscribe(results => {
        // Display the search results
      });

    `;

    this.code6 = ` 
    import { forkJoin } from 'rxjs';

    // Fetch user data and orders concurrently
    const user$ = fetch('/user/1').then(res => res.json());
    const orders$ = fetch('/orders?userId=1').then(res => res.json());

    forkJoin([user$, orders$]) // Combine the observables
      .subscribe(([user, orders]) => {
        // Handle both user and orders data
      });

    `;

    this.code7 = ` 
    //Here, we're using a Subject to dispatch actions, and the scan operator accumulates the changes
    // to manage the state of a counter. This code snippet illustrates how you can use RxJS to manage 
    // state without relying on NgRx or other state management libraries.
    
    import { Subject } from 'rxjs';
    import { scan, startWith } from 'rxjs/operators';

    // Define a subject to dispatch actions
    const actions$ = new Subject<number>();

    // Define an observable to manage the state
    const counter$ = actions$.pipe(
      startWith(0), // Start with an initial value of 0
      scan((state, change) => state + change) // Accumulate the changes to calculate the current state
    );

    // Subscribe to the observable to handle the current state
    counter$.subscribe(state => console.log('Counter value: \${ state }'));

    // Dispatch actions to change the state
    actions$.next(1); // Increment by 1
    actions$.next(-1); // Decrement by 1
    `;

    this.code8 = ` 
    import { webSocket } from 'rxjs/webSocket';

    const subject = webSocket('ws://example.com');

    subject.subscribe(
      msg => console.log('Received:', msg), // Handle received messages
      err => console.error(err), // Handle errors
      () => console.log('Complete') // Handle completion
    );

    subject.next({ message: 'Hello' }); // Send a message to the server

    `;

    this.code9 = ` 
    import { interval } from 'rxjs';
    import { take } from 'rxjs/operators';

    const progressElement = document.getElementById('progress-bar');

    // Emit values every 50ms for 2 seconds
    interval(50).pipe(take(40))
      .subscribe(step => {
        // Update the progress bar by 2.5% each step
        progressElement.style.width = '\${ 2.5 * step }%';
      });

    `;
  }


  start() {
    this.completed = "";
    this.elapsedTime = 0;
    this.beginTimer();
  }

  private beginTimer() {

    const timer$ = timer(0, 1000);

    this.timerSub = timer$
      .pipe(
        takeUntil(this.stop$)
      )
      .subscribe(tick => {
        this.elapsedTime++;
      });
    this.isPaused = false;
  }

  /**
   * Pause the stopwatch
   */
  pause() {
    this.isPaused = true;
    this.stop$.next();
  }

  /**
   * Unpause the stopwatch
   */
  unpause() {
    if (this.isPaused) {
      this.beginTimer();
    }
  }

  /**
   * Toggle pause and unpause
   */
  togglePause() {
    if (this.isPaused) {
      this.unpause();
    } else {
      this.pause();
    }
  }

  /**
   * Complete the stopwatch and cleanup
   */
  complete() {
    this.isPaused = true;
    this.stop$.next();
    if (this.timerSub) {
      this.timerSub.unsubscribe();
    }

    this.completed = "Timer has completed";
  }

  ngOnDestroy() {
    this.stop$.next();
    this.stop$.complete();
  }

  // Function to start the observable sequence
  startObservables() {
    this.outputMessage = []; // Reset the output message

    const observable1 = new Observable((observer) => {
      this.outputMessage.push('Starting observable1');

      asyncScheduler.schedule(() => {
        this.outputMessage.push('observable1: Emitting 1');
        observer.next(1);
      }, 1000);

      asyncScheduler.schedule(() => {
        this.outputMessage.push('observable1: Emitting 2');
        observer.next(2);
      }, 2000);

      asyncScheduler.schedule(() => {
        this.outputMessage.push('observable1: Emitting 3');
        observer.next(3);
        observer.complete();
      }, 3000);
    });

    const observable2 = new Observable((observer) => {
      this.outputMessage.push('Starting observable2');

      observer.next('A');
      observer.next('B');
      observer.next('C');
      observer.complete();
    }).pipe(
      observeOn(queueScheduler)
    );

    const combinedObservable = combineLatest([observable1, observable2]).pipe(
      observeOn(asapScheduler)
    );

    this.outputMessage.push('Just before subscribing to combinedObservable');
    combinedObservable.pipe(
      subscribeOn(asapScheduler)
    ).subscribe({
      next: (value) => {
        this.outputMessage.push(`Received value: ${JSON.stringify(value)}`);
      },
      error: (err) => {
        this.outputMessage.push(`An error occurred: ${err}`);
      },
      complete: () => {
        this.outputMessage.push('All done!');
      }
    });
    this.outputMessage.push('Just after subscribing to combinedObservable');
  }
}
