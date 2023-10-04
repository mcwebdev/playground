import { Component } from '@angular/core';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent {
  code: string = `
  // 1. Creating and Subscribing to Simple Observable:
import { Observable } from 'rxjs';

const simpleObservable = new Observable(observer => {
  observer.next('Hello');
  observer.next('World');
  observer.complete();
});

simpleObservable.subscribe(
  value => console.log(value),
  error => console.error(error),
  () => console.log('Completed')
);

// 2. Transforming Observables using Operators:
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

const numbers = of(1, 2, 3, 4, 5);
const squareNumbers = numbers.pipe(
  map(value => value * value)
);

squareNumbers.subscribe(square => console.log(square));

// 3. Combining Observables:
import { combineLatest, of } from 'rxjs';

const observable1 = of(1, 2, 3);
const observable2 = of(4, 5, 6);

const combined = combineLatest([observable1, observable2]);

combined.subscribe(
  ([value1, value2]) => console.log(value1, value2)
);

// 4. Handling HTTP Requests with RxJS in Angular:
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  fetchData(url: string) {
    return this.http.get(url).pipe(
      catchError(error => {
        console.error(error);
        throw error;
      })
    );
  }
}

  `;
}
