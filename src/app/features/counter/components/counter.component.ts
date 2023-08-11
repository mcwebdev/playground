import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as CounterActions from '../actions/counter.actions';

@Component({
    selector: 'app-counter',
    template: `
    <div class="counter-container">
      <button (click)="increment()" class="counter-button">Increment</button>      
      <button (click)="decrement()" class="counter-button">Decrement</button>
      <div class="counter-display">Current Count: {{ count$ | async }}</div>
      <button (click)="reset()" class="counter-button">Reset</button>
    </div>
    `,
    styles: [`
        .counter-container {
            display: flex;
            flex-direction: column;
            gap: 10px;
            font-family: Arial, sans-serif;
            width: 100%;
            max-width: 400px;
        }
        .counter-button {
            padding: 10px 20px;
            border: none;
            background-color: #4CAF50;
            color: white;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s;
            outline: none;
            border-radius: 5px;
        }
        .counter-button:hover {
            background-color: #45a049;
        }
        .counter-display {
            font-size: 18px;
            font-weight: bold;
        }
    `]
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
