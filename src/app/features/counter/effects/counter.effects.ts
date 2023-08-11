import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from, of } from 'rxjs';
import { mergeMap, catchError, map, withLatestFrom } from 'rxjs/operators';
import * as CounterActions from '../actions/counter.actions';
import { CounterService } from '../components/counter.service';

@Injectable()
export class CounterEffects {
    // Select the current counter value from the store
    counter$ = this.store.select('counter');

    saveCounter$ = createEffect(() => this.actions$.pipe(
        ofType(CounterActions.increment, CounterActions.decrement, CounterActions.reset),
        withLatestFrom(this.counter$), // Combine the latest counter value with the action
        mergeMap(([action, counter]) => { // Destructure the combined value
            // Convert the Promise returned by saveCounter to an Observable, using the current counter value
            const saveCounterObservable = from(this.counterService.saveCounter(counter));
            return saveCounterObservable.pipe(
                map(() => CounterActions.saveCounterSuccess()), // Dispatch success action
                catchError(() => of(CounterActions.saveCounterFailure())) // Dispatch failure action
            );
        })
    ));

    constructor(
        private actions$: Actions,
        private counterService: CounterService,
        private store: Store<{ counter: number }> // Inject the store
    ) { }
}
