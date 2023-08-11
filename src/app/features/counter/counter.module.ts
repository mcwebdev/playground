import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { counterReducer, counterFeatureKey } from './reducers/counter.reducer';
import { CounterEffects } from './effects/counter.effects';

@NgModule({
    imports: [
        StoreModule.forFeature(counterFeatureKey, counterReducer),
        EffectsModule.forFeature([CounterEffects]),
    ],
})
export class CounterModule { }
