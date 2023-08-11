// counter.actions.ts
import { createAction } from '@ngrx/store';

export const increment = createAction('[Counter Component] Increment');
export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] Reset');
export const saveCounterSuccess = createAction('[Counter Component] Save Counter Success');
export const saveCounterFailure = createAction('[Counter Component] Save Counter Failure');
