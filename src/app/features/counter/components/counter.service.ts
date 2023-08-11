import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Corrected import path

@Injectable({
    providedIn: 'root',
})
export class CounterService {
    private counterDocRef = this.firestore.collection('counters').doc('myCounter');

    constructor(private firestore: AngularFirestore) { }

    saveCounter(value: number) {
        return this.counterDocRef.set({ value });
    }
}
