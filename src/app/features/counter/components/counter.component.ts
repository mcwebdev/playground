import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as CounterActions from '../actions/counter.actions';

@Component({
    selector: 'app-counter',
    template: `
    <button (click)="increment()">Increment</button>
    <div>Current Count: {{ count$ | async }}</div>
    <button (click)="decrement()">Decrement</button>
    <button (click)="reset()">Reset</button>
  `,
})
export class CounterComponent {
    count$ = this.store.select('counter');

    constructor(private store: Store<{ counter: number }>) { }

    increment() {
        this.store.dispatch(CounterActions.increment());
    }

    decrement() {
        this.store.dispatch(CounterActions.decrement());
    }

    reset() {
        this.store.dispatch(CounterActions.reset());
    }
}
