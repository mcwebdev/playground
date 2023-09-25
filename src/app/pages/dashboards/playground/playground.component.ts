import { Component, OnInit } from '@angular/core';
import * as data from '../../../shared/models/data';
import { of, fromEvent, scan, Subject, interval, throwError, from } from 'rxjs';
import {
  mergeMap, switchMap, delay, map, filter,
  find, catchError, reduce, debounceTime,
  distinctUntilChanged, combineLatestWith,
  concatMap, exhaustMap, takeUntil, takeWhile,
  startWith, shareReplay, retry, take, takeLast, tap
} from 'rxjs/operators';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {
  multiplyAllNumbersByTwoResults: any[] = [];
  filterOutNonNumbersResults: any[] = [];
  sumOfSimpleArrayOfNumbersResults: any[] = [];
  findFirstArrayWithNumberThreeResults: any[] = [];
  firstAndLastThreeItemsOfSimpleArrayOfNumbersResults: any[] = [];
  logValuesOfSimpleArrayOfNumbersResults: any[] = [];
  handleErrorsInArraysWithGotchasResults: any[] = [];
  delayEmitsOfSimpleArrayOfNumbersResults: any[] = [];
  debounceClickEventsResults: any[] = [];
  removeConsecutiveDuplicatesFromArraysWithGotchasResults: any[] = [];
  multiplyNumbersAndMergeResultsResults: any[] = [];
  switchToNewObservableForEachNumberResults: any[] = [];
  combineSimpleArrayOfNumbersWithAnotherObservableResults: any[] = [];
  concatenateMultiplicationResultsResults: any[] = [];
  ignoreNewEmissionsWhilePreviousOnesAreProcessingResults: any[] = [];
  emitValuesUntilClickEventResults: any[] = [];
  emitValuesWhileLessThanTwentyResults: any[] = [];
  startWithASpecificValueResults: any[] = [];
  shareAndReplayLastTwoEmissionsResults: any[] = [];
  retryOnErrorThreeTimesResults: any[] = [];
  users = data.complexNestedObjects.users;
  exampleData: string;
  public stopBidding$ = new Subject<any>();
  public results: string[] = [];

  constructor() {

    this.exampleData = `
        // data
        export const simpleArrayOfNumbers = [5, 10, 15, 20, 25];
        export const mixedTypes = [7, "apple", 3.14, "banana", 42];
        export const nestedArrays = [[1, 2], [3, "four"], [5, 6, [7, "eight"]]];
        export const simpleObject = { "name": "John", "age": 30, "city": "New York" };
        export const mixedObject = { "id": 1, "info": { "name": "Alice", "skills": ["Python", "JS"] }, "grades": [90, 85, 80] };
        export const complexNestedObjects = {
            "users": [
                { "id": 1, "name": "Bob", "orders": [{ "product": "Laptop", "price": 1000 }] },
                { "id": 2, "name": "Sara", "orders": [{ "product": "Phone", "price": 500 }, { "product": "Tablet", "price": 300 }] }
            ]
        };
        export const arraysWithGotchas = [1, "2", null, undefined, NaN, { "key": "value" }, [3, "four"]];
        export const objectWithFunctions = {
            "calculate": function (x: number) { return x * 2; },
            "data": [1, 2, 3],
            "info": undefined
        };
        export const mixedTypesWithSpecialCharacters = [1, "text with spaces", 3.14, { "key": "value with \"quotes\"" }, [5, "six"], null];
   `
  }

  ngOnInit() { }

  startBidding() {
    // Simulated API that randomly succeeds or fails
    const api = {
      makeBid(userId: number, amount: number) {
        // 80% chance of success
        const success = Math.random() > 0.2;
        console.log(`User ${userId} bid ${amount} ${success ? 'successfully' : 'unsuccessfully'}.`);
        // If successful, return a success message; otherwise, throw an error
        return success ? of(`User ${userId} bid ${amount} successfully.`) : throwError(() => new Error(`User ${userId} bid failed.`));
      }
    };

    // Create an observable that emits every 1000ms (1s)
    const incomingBids$ = interval(1000).pipe(
      takeUntil(this.stopBidding$), // Stop emitting when stopBidding$ emits a value
      switchMap(() => {
        // Generate random userId and amount
        const userId = Math.floor(Math.random() * 10);
        const amount = Math.floor(Math.random() * 100) + 1;
        return of({ userId, amount }); // Return an observable with the random userId and amount
      }),
      mergeMap(bid => {
        // Make a bid and catch any errors
        return api.makeBid(bid.userId, bid.amount).pipe(
          catchError(err => of(err)) // Catch errors and return them as observable
        );
      })
    );

    // Subscribe to the incomingBids$ observable
    incomingBids$.subscribe({
      next: result => {
        this.results.push(result);  // On new value, push the result into the results array
      },
      error: error => {
        this.results.push(`Error: ${error}`);  // On error, push the error message into the results array
      },
      complete: () => {
        this.results.push('Bidding completed.');  // On completion, push a completion message into the results array
      }
    });

  }


  ngOnDestroy() {
    this.stopBidding$.next(null);
  }

  actions = [
    {
      title: 'Multiply All Numbers by 2',
      explanation: 'This action multiplies all numbers in the simple array of numbers by 2.',
      codeSnippet: `multiplyAllNumbersByTwo() {
    from(data.simpleArrayOfNumbers)
      .pipe(map(x => x * 2))
      .subscribe({
        next: x => this.multiplyAllNumbersByTwoResults.push('map: \${ x }'),
        error: err => this.multiplyAllNumbersByTwoResults.push('Error: \${ err }'),
        complete: () => this.multiplyAllNumbersByTwoResults.push('Completed')
      });
  }`,
      execute: () => this.multiplyAllNumbersByTwo(),
      resultArray: this.multiplyAllNumbersByTwoResults
    },
    {
      title: 'Filter Out Non-Numbers',
      explanation: 'This action filters out non-number values from the mixed types array.',
      codeSnippet: `filterOutNonNumbers() {
    of(...data.mixedTypes)
      .pipe(filter(x => typeof x === 'number'))
      .subscribe({
        next: x => this.filterOutNonNumbersResults.push('filter: \${ x }'),
        error: err => this.filterOutNonNumbersResults.push('Error: \${ err }'),
        complete: () => this.filterOutNonNumbersResults.push('Completed')
      });
  }`,
      execute: () => this.filterOutNonNumbers(),
      resultArray: this.filterOutNonNumbersResults
    },
    {
      title: 'Find First Array Containing Number 3',
      explanation: 'This action finds the first array in the nested arrays that contains the number 3.',
      codeSnippet: `  sumOfSimpleArrayOfNumbers() {
    of(...data.simpleArrayOfNumbers)
      .pipe(reduce((acc, x) => acc + x, 0))
      .subscribe({
        next: x => this.sumOfSimpleArrayOfNumbersResults.push('reduce: \${ x }'),
        error: err => this.sumOfSimpleArrayOfNumbersResults.push('Error: \${ err }'),
        complete: () => this.sumOfSimpleArrayOfNumbersResults.push('Completed')
      });
  }`,
      execute: () => this.findFirstArrayWithNumberThree(),
      resultArray: this.findFirstArrayWithNumberThreeResults
    },
    {
      title: 'Sum of simpleArrayOfNumbers',
      explanation: 'This action calculates the sum of the simple array of numbers.',
      codeSnippet: `sumOfSimpleArrayOfNumbers() {
    of(...data.simpleArrayOfNumbers)
      .pipe(reduce((acc, x) => acc + x, 0))
      .subscribe({
        next: x => this.sumOfSimpleArrayOfNumbersResults.push('reduce: \${ x }'),
        error: err => this.sumOfSimpleArrayOfNumbersResults.push('Error: \${ err }'),
        complete: () => this.sumOfSimpleArrayOfNumbersResults.push('Completed')
      });
  }`,
      execute: () => this.sumOfSimpleArrayOfNumbers(),
      resultArray: this.sumOfSimpleArrayOfNumbersResults
    },
    {
      title: 'First 3 and Last 3 Items of simpleArrayOfNumbers',
      explanation: 'This action retrieves the first 3 and last 3 items of the simple array of numbers.',
      codeSnippet: `firstAndLastThreeItemsOfSimpleArrayOfNumbers() {
    of(...data.simpleArrayOfNumbers)
      .pipe(take(3))
      .subscribe({
        next: x => this.firstAndLastThreeItemsOfSimpleArrayOfNumbersResults.push('take(first 3): \$ { x }'),
        error: err => this.firstAndLastThreeItemsOfSimpleArrayOfNumbersResults.push('Error: \${ err }'),
        complete: () => this.firstAndLastThreeItemsOfSimpleArrayOfNumbersResults.push('Completed (first 3)')
      });
    of(...data.simpleArrayOfNumbers)
      .pipe(takeLast(3))
      .subscribe({
        next: x => this.firstAndLastThreeItemsOfSimpleArrayOfNumbersResults.push('takeLast(last 3): \${ x }'),
        error: err => this.firstAndLastThreeItemsOfSimpleArrayOfNumbersResults.push('Error: \${ err }'),
        complete: () => this.firstAndLastThreeItemsOfSimpleArrayOfNumbersResults.push('Completed (last 3)')
      });
  }`,
      execute: () => this.firstAndLastThreeItemsOfSimpleArrayOfNumbers(),
      resultArray: this.firstAndLastThreeItemsOfSimpleArrayOfNumbersResults
    },
    {
      title: 'Log Values of simpleArrayOfNumbers',
      explanation: 'This action logs the values of the simple array of numbers.',
      codeSnippet: `logValuesOfSimpleArrayOfNumbers() {
    of(...data.simpleArrayOfNumbers)
      .pipe(tap(x => console.log('tap: \${ x }')))
      .subscribe({
        next: x => this.logValuesOfSimpleArrayOfNumbersResults.push('tap: \${ x }'),
        error: err => this.logValuesOfSimpleArrayOfNumbersResults.push('Error: \${ err }'),
        complete: () => this.logValuesOfSimpleArrayOfNumbersResults.push('Completed')
      });
  }`,
      execute: () => this.logValuesOfSimpleArrayOfNumbers(),
      resultArray: this.logValuesOfSimpleArrayOfNumbersResults
    },
    {
      title: 'Handle Errors in arraysWithGotchas',
      explanation: 'This action handles errors in the array with gotchas by catching null values.',
      codeSnippet: `handleErrorsInArraysWithGotchas() {
    of(...data.arraysWithGotchas)
      .pipe(
        map(x => { if (x === null) throw new Error('Null value'); return x; }),
        catchError(err => of('catchError: \${ err.message }'))
      )
      .subscribe({
        next: x => this.handleErrorsInArraysWithGotchasResults.push(x),
        error: err => this.handleErrorsInArraysWithGotchasResults.push('Error: \${ err }'),
        complete: () => this.handleErrorsInArraysWithGotchasResults.push('Completed')
      });
  }`,
      execute: () => this.handleErrorsInArraysWithGotchas(),
      resultArray: this.handleErrorsInArraysWithGotchasResults
    },
    {
      title: 'Delay Emits of simpleArrayOfNumbers',
      explanation: 'This action delays the emission of values from the simple array of numbers by 1000 milliseconds.',
      codeSnippet: `delayEmitsOfSimpleArrayOfNumbers() {
    of(...data.simpleArrayOfNumbers)
      .pipe(delay(1000))
      .subscribe({
        next: x => this.delayEmitsOfSimpleArrayOfNumbersResults.push('delay: \${ x }'),
        error: err => this.delayEmitsOfSimpleArrayOfNumbersResults.push('Error: \${ err }'),
        complete: () => this.delayEmitsOfSimpleArrayOfNumbersResults.push('Completed')
      });
  }`,
      execute: () => this.delayEmitsOfSimpleArrayOfNumbers(),
      resultArray: this.delayEmitsOfSimpleArrayOfNumbersResults
    },
    {
      title: 'Debounce Click Events',
      explanation: 'This action debounces click events by 300 milliseconds.',
      codeSnippet: `
  debounceClickEvents() {
    fromEvent(document, 'click')
      .pipe(debounceTime(300))
      .subscribe({
        next: () => this.debounceClickEventsResults.push('debounceTime: Clicked!'),
        error: err => this.debounceClickEventsResults.push('Error: \${ err }'),
        complete: () => this.debounceClickEventsResults.push('Completed')
      });
  }`,
      execute: () => this.debounceClickEvents(),
      resultArray: this.debounceClickEventsResults
    },
    {
      title: 'Remove Consecutive Duplicates from arraysWithGotchas',
      explanation: 'This action removes consecutive duplicate values from the array with gotchas.',
      codeSnippet: `removeConsecutiveDuplicatesFromArraysWithGotchas() {
    of(...data.arraysWithGotchas)
      .pipe(distinctUntilChanged())
      .subscribe({
        next: x => this.removeConsecutiveDuplicatesFromArraysWithGotchasResults.push('distinctUntilChanged: \${ x }'),
        error: err => this.removeConsecutiveDuplicatesFromArraysWithGotchasResults.push('Error: \${ err }'),
        complete: () => this.removeConsecutiveDuplicatesFromArraysWithGotchasResults.push('Completed')
      });
  }`,
      execute: () => this.removeConsecutiveDuplicatesFromArraysWithGotchas(),
      resultArray: this.removeConsecutiveDuplicatesFromArraysWithGotchasResults
    },
    {
      title: 'Multiply Numbers and Merge Results',
      explanation: 'This action multiplies numbers from the simple array of numbers and merges the results.',
      codeSnippet: `  multiplyNumbersAndMergeResults() {
    of(...data.simpleArrayOfNumbers)
      .pipe(mergeMap(x => of(x * 2)))
      .subscribe({
        next: x => this.multiplyNumbersAndMergeResultsResults.push('mergeMap: \${ x }'),
        error: err => this.multiplyNumbersAndMergeResultsResults.push('Error: \${ err }'),
        complete: () => this.multiplyNumbersAndMergeResultsResults.push('Completed')
      });
  }`,
      execute: () => this.multiplyNumbersAndMergeResults(),
      resultArray: this.multiplyNumbersAndMergeResultsResults
    },
    {
      title: 'Switch to New Observable for Each Number',
      explanation: 'This action switches to a new observable for each number in the simple array of numbers, incrementing it by 1.',
      codeSnippet: `  switchToNewObservableForEachNumber() {
    of(...data.simpleArrayOfNumbers)
      .pipe(switchMap(x => of(x + 1)))
      .subscribe({
        next: x => this.switchToNewObservableForEachNumberResults.push('switchMap: \${ x }'),
        error: err => this.switchToNewObservableForEachNumberResults.push('Error: \${ err }'),
        complete: () => this.switchToNewObservableForEachNumberResults.push('Completed')
      });
  }`,
      execute: () => this.switchToNewObservableForEachNumber(),
      resultArray: this.switchToNewObservableForEachNumberResults
    },
    {
      title: 'Combine simpleArrayOfNumbers with Another Observable',
      explanation: 'This action combines the simple array of numbers with another observable containing [100, 200, 300], adding the corresponding elements.',
      codeSnippet: `  combineSimpleArrayOfNumbersWithAnotherObservable() {
    of(...data.simpleArrayOfNumbers)
      .pipe(
        combineLatestWith(of(100, 200, 300)),
        map(([a, b]) => a + b)
      )
      .subscribe({
        next: x => this.combineSimpleArrayOfNumbersWithAnotherObservableResults.push('combineLatestWith: \${ x }'),
        error: err => this.combineSimpleArrayOfNumbersWithAnotherObservableResults.push('Error: \${ err }'),
        complete: () => this.combineSimpleArrayOfNumbersWithAnotherObservableResults.push('Completed')
      });
  }`,
      execute: () => this.combineSimpleArrayOfNumbersWithAnotherObservable(),
      resultArray: this.combineSimpleArrayOfNumbersWithAnotherObservableResults
    },
    {
      title: 'Concatenate Multiplication Results',
      explanation: 'This action concatenates the multiplication results of the simple array of numbers.',
      codeSnippet: `  concatenateMultiplicationResults() {
    of(...data.simpleArrayOfNumbers)
      .pipe(concatMap(x => of(x * 2)))
      .subscribe({
        next: x => this.concatenateMultiplicationResultsResults.push('concatMap: \${ x }'),
        error: err => this.concatenateMultiplicationResultsResults.push('Error: \${ err }'),
        complete: () => this.concatenateMultiplicationResultsResults.push('Completed')
      });
  }`,
      execute: () => this.concatenateMultiplicationResults(),
      resultArray: this.concatenateMultiplicationResultsResults
    },
    {
      title: 'Ignore New Emissions While Previous Ones Are Still Processing',
      explanation: 'This action ignores new emissions from the simple array of numbers while previous ones are still processing.',
      codeSnippet: `ignoreNewEmissionsWhilePreviousOnesAreProcessing() {
    of(...data.simpleArrayOfNumbers)
      .pipe(exhaustMap(x => of(x * 2).pipe(delay(1000))))
      .subscribe({
        next: x => this.ignoreNewEmissionsWhilePreviousOnesAreProcessingResults.push('exhaustMap: \${ x }'),
        error: err => this.ignoreNewEmissionsWhilePreviousOnesAreProcessingResults.push('Error: \${ err }'),
        complete: () => this.ignoreNewEmissionsWhilePreviousOnesAreProcessingResults.push('Completed')
      });
  }`,
      execute: () => this.ignoreNewEmissionsWhilePreviousOnesAreProcessing(),
      resultArray: this.ignoreNewEmissionsWhilePreviousOnesAreProcessingResults
    },
    {
      title: 'Emit Values Until Click Event',
      explanation: 'This action emits values from the simple array of numbers until a click event occurs on the document.',
      codeSnippet: `  emitValuesUntilClickEvent() {
    of(...data.simpleArrayOfNumbers)
      .pipe(takeUntil(fromEvent(document, 'click')))
      .subscribe({
        next: x => this.emitValuesUntilClickEventResults.push('takeUntil: \${ x }'),
        error: err => this.emitValuesUntilClickEventResults.push('Error: \${ err }'),
        complete: () => this.emitValuesUntilClickEventResults.push('Completed')
      });
  }`,
      execute: () => this.emitValuesUntilClickEvent(),
      resultArray: this.emitValuesUntilClickEventResults
    },
    {
      title: 'Emit Values While Less Than 20',
      explanation: 'This action emits values from the simple array of numbers while they are less than 20.',
      codeSnippet: `emitValuesWhileLessThanTwenty() {
    of(...data.simpleArrayOfNumbers)
      .pipe(takeWhile(x => x < 20))
      .subscribe({
        next: x => this.emitValuesWhileLessThanTwentyResults.push('takeWhile: \${ x }'),
        error: err => this.emitValuesWhileLessThanTwentyResults.push('Error: \${ err }'),
        complete: () => this.emitValuesWhileLessThanTwentyResults.push('Completed')
      });
  }`,
      execute: () => this.emitValuesWhileLessThanTwenty(),
      resultArray: this.emitValuesWhileLessThanTwentyResults
    },
    {
      title: 'Start with a Specific Value',
      explanation: 'This action starts the emission from the simple array of numbers with the value "Start".',
      codeSnippet: `startWithASpecificValue() {
    of(...data.simpleArrayOfNumbers)
      .pipe(startWith('Start'))
      .subscribe({
        next: x => this.startWithASpecificValueResults.push('startWith: \${ x }'),
        error: err => this.startWithASpecificValueResults.push('Error: \${ err }'),
        complete: () => this.startWithASpecificValueResults.push('Completed')
      });
  }`,
      execute: () => this.startWithASpecificValue(),
      resultArray: this.startWithASpecificValueResults
    },
    {
      title: 'Share and Replay Last 2 Emissions',
      explanation: 'This action shares and replays the last 2 emissions from the simple array of numbers.',
      codeSnippet: `  shareAndReplayLastTwoEmissions() {
    const sharedObs$ = of(...data.simpleArrayOfNumbers).pipe(shareReplay(2));
    sharedObs$.subscribe({
      next: x => this.shareAndReplayLastTwoEmissionsResults.push('shareReplay(First): \${ x }'),
      error: err => this.shareAndReplayLastTwoEmissionsResults.push('Error: \${ err }'),
      complete: () => this.shareAndReplayLastTwoEmissionsResults.push('Completed')
    });
    sharedObs$.subscribe({
      next: x => this.shareAndReplayLastTwoEmissionsResults.push('shareReplay(Second): \${ x }'),
      error: err => this.shareAndReplayLastTwoEmissionsResults.push('Error: \${ err }'),
      complete: () => this.shareAndReplayLastTwoEmissionsResults.push('Completed')
    });
  }`,
      execute: () => this.shareAndReplayLastTwoEmissions(),
      resultArray: this.shareAndReplayLastTwoEmissionsResults
    },
    {
      title: 'Retry on Error 3 Times',
      explanation: 'This action retries the emission from the array with gotchas three times on error.',
      codeSnippet: `retryOnErrorThreeTimes() {
    of(...data.arraysWithGotchas)
      .pipe(
        map(x => { if (x === null) throw new Error('Null value'); return x; }),
        retry(3)
      )
      .subscribe({
        next: x => this.retryOnErrorThreeTimesResults.push('retry: \${ x }'),
        error: err => this.retryOnErrorThreeTimesResults.push('Error: \${ err }'),
        complete: () => this.retryOnErrorThreeTimesResults.push('Completed')
      });
  }`,
      execute: () => this.retryOnErrorThreeTimes(),
      resultArray: this.retryOnErrorThreeTimesResults
    }
  ];

  multiplyAllNumbersByTwo() {
    from(data.simpleArrayOfNumbers)
      .pipe(map(x => x * 2))
      .subscribe({
        next: x => this.multiplyAllNumbersByTwoResults.push(`map: ${x}`),
        error: err => this.multiplyAllNumbersByTwoResults.push(`Error: ${err}`),
        complete: () => this.multiplyAllNumbersByTwoResults.push('Completed')
      });
  }
  emitValuesWhileLessThanTwenty() {
    of(...data.simpleArrayOfNumbers)
      .pipe(takeWhile(x => x < 20))
      .subscribe({
        next: x => this.emitValuesWhileLessThanTwentyResults.push(`takeWhile: ${x}`),
        error: err => this.emitValuesWhileLessThanTwentyResults.push(`Error: ${err}`),
        complete: () => this.emitValuesWhileLessThanTwentyResults.push('Completed')
      });
  }
  startWithASpecificValue() {
    of(...data.simpleArrayOfNumbers)
      .pipe(startWith('Start'))
      .subscribe({
        next: x => this.startWithASpecificValueResults.push(`startWith: ${x}`),
        error: err => this.startWithASpecificValueResults.push(`Error: ${err}`),
        complete: () => this.startWithASpecificValueResults.push('Completed')
      });
  }
  shareAndReplayLastTwoEmissions() {
    const sharedObs$ = of(...data.simpleArrayOfNumbers).pipe(shareReplay(2));
    sharedObs$.subscribe({
      next: x => this.shareAndReplayLastTwoEmissionsResults.push(`shareReplay (First): ${x}`),
      error: err => this.shareAndReplayLastTwoEmissionsResults.push(`Error: ${err}`),
      complete: () => this.shareAndReplayLastTwoEmissionsResults.push('Completed')
    });
    sharedObs$.subscribe({
      next: x => this.shareAndReplayLastTwoEmissionsResults.push(`shareReplay (Second): ${x}`),
      error: err => this.shareAndReplayLastTwoEmissionsResults.push(`Error: ${err}`),
      complete: () => this.shareAndReplayLastTwoEmissionsResults.push('Completed')
    });
  }

  filterOutNonNumbers() {
    of(...data.mixedTypes)
      .pipe(filter(x => typeof x === 'number'))
      .subscribe({
        next: x => this.filterOutNonNumbersResults.push(`filter: ${x}`),
        error: err => this.filterOutNonNumbersResults.push(`Error: ${err}`),
        complete: () => this.filterOutNonNumbersResults.push('Completed')
      });
  }
  findFirstArrayWithNumberThree() {
    of(...data.nestedArrays)
      .pipe(find(x => x.includes(3)))
      .subscribe({
        next: x => this.findFirstArrayWithNumberThreeResults.push(`find: ${x}`),
        error: err => this.findFirstArrayWithNumberThreeResults.push(`Error: ${err}`),
        complete: () => this.findFirstArrayWithNumberThreeResults.push('Completed')
      });
  }

  sumOfSimpleArrayOfNumbers() {
    of(...data.simpleArrayOfNumbers)
      .pipe(reduce((acc, x) => acc + x, 0))
      .subscribe({
        next: x => this.sumOfSimpleArrayOfNumbersResults.push(`reduce: ${x}`),
        error: err => this.sumOfSimpleArrayOfNumbersResults.push(`Error: ${err}`),
        complete: () => this.sumOfSimpleArrayOfNumbersResults.push('Completed')
      });
  }

  firstAndLastThreeItemsOfSimpleArrayOfNumbers() {
    of(...data.simpleArrayOfNumbers)
      .pipe(take(3))
      .subscribe({
        next: x => this.firstAndLastThreeItemsOfSimpleArrayOfNumbersResults.push(`take (first 3): ${x}`),
        error: err => this.firstAndLastThreeItemsOfSimpleArrayOfNumbersResults.push(`Error: ${err}`),
        complete: () => this.firstAndLastThreeItemsOfSimpleArrayOfNumbersResults.push('Completed (first 3)')
      });
    of(...data.simpleArrayOfNumbers)
      .pipe(takeLast(3))
      .subscribe({
        next: x => this.firstAndLastThreeItemsOfSimpleArrayOfNumbersResults.push(`takeLast (last 3): ${x}`),
        error: err => this.firstAndLastThreeItemsOfSimpleArrayOfNumbersResults.push(`Error: ${err}`),
        complete: () => this.firstAndLastThreeItemsOfSimpleArrayOfNumbersResults.push('Completed (last 3)')
      });
  }

  logValuesOfSimpleArrayOfNumbers() {
    of(...data.simpleArrayOfNumbers)
      .pipe(tap(x => console.log(`tap: ${x}`)))
      .subscribe({
        next: x => this.logValuesOfSimpleArrayOfNumbersResults.push(`tap: ${x}`),
        error: err => this.logValuesOfSimpleArrayOfNumbersResults.push(`Error: ${err}`),
        complete: () => this.logValuesOfSimpleArrayOfNumbersResults.push('Completed')
      });
  }

  handleErrorsInArraysWithGotchas() {
    of(...data.arraysWithGotchas)
      .pipe(
        map(x => { if (x === null) throw new Error('Null value'); return x; }),
        catchError(err => of(`catchError: ${err.message}`))
      )
      .subscribe({
        next: x => this.handleErrorsInArraysWithGotchasResults.push(x),
        error: err => this.handleErrorsInArraysWithGotchasResults.push(`Error: ${err}`),
        complete: () => this.handleErrorsInArraysWithGotchasResults.push('Completed')
      });
  }

  delayEmitsOfSimpleArrayOfNumbers() {
    of(...data.simpleArrayOfNumbers)
      .pipe(delay(1000))
      .subscribe({
        next: x => this.delayEmitsOfSimpleArrayOfNumbersResults.push(`delay: ${x}`),
        error: err => this.delayEmitsOfSimpleArrayOfNumbersResults.push(`Error: ${err}`),
        complete: () => this.delayEmitsOfSimpleArrayOfNumbersResults.push('Completed')
      });
  }

  debounceClickEvents() {
    fromEvent(document, 'click')
      .pipe(debounceTime(300))
      .subscribe({
        next: () => this.debounceClickEventsResults.push('debounceTime: Clicked!'),
        error: err => this.debounceClickEventsResults.push(`Error: ${err}`),
        complete: () => this.debounceClickEventsResults.push('Completed')
      });
  }

  removeConsecutiveDuplicatesFromArraysWithGotchas() {
    of(...data.arraysWithGotchas)
      .pipe(distinctUntilChanged())
      .subscribe({
        next: x => this.removeConsecutiveDuplicatesFromArraysWithGotchasResults.push(`distinctUntilChanged: ${x}`),
        error: err => this.removeConsecutiveDuplicatesFromArraysWithGotchasResults.push(`Error: ${err}`),
        complete: () => this.removeConsecutiveDuplicatesFromArraysWithGotchasResults.push('Completed')
      });
  }

  multiplyNumbersAndMergeResults() {
    of(...data.simpleArrayOfNumbers)
      .pipe(mergeMap(x => of(x * 2)))
      .subscribe({
        next: x => this.multiplyNumbersAndMergeResultsResults.push(`mergeMap: ${x}`),
        error: err => this.multiplyNumbersAndMergeResultsResults.push(`Error: ${err}`),
        complete: () => this.multiplyNumbersAndMergeResultsResults.push('Completed')
      });
  }

  switchToNewObservableForEachNumber() {
    of(...data.simpleArrayOfNumbers)
      .pipe(switchMap(x => of(x + 1)))
      .subscribe({
        next: x => this.switchToNewObservableForEachNumberResults.push(`switchMap: ${x}`),
        error: err => this.switchToNewObservableForEachNumberResults.push(`Error: ${err}`),
        complete: () => this.switchToNewObservableForEachNumberResults.push('Completed')
      });
  }

  combineSimpleArrayOfNumbersWithAnotherObservable() {
    of(...data.simpleArrayOfNumbers)
      .pipe(
        combineLatestWith(of(100, 200, 300)),
        map(([a, b]) => a + b)
      )
      .subscribe({
        next: x => this.combineSimpleArrayOfNumbersWithAnotherObservableResults.push(`combineLatestWith: ${x}`),
        error: err => this.combineSimpleArrayOfNumbersWithAnotherObservableResults.push(`Error: ${err}`),
        complete: () => this.combineSimpleArrayOfNumbersWithAnotherObservableResults.push('Completed')
      });
  }

  concatenateMultiplicationResults() {
    of(...data.simpleArrayOfNumbers)
      .pipe(concatMap(x => of(x * 2)))
      .subscribe({
        next: x => this.concatenateMultiplicationResultsResults.push(`concatMap: ${x}`),
        error: err => this.concatenateMultiplicationResultsResults.push(`Error: ${err}`),
        complete: () => this.concatenateMultiplicationResultsResults.push('Completed')
      });
  }

  ignoreNewEmissionsWhilePreviousOnesAreProcessing() {
    of(...data.simpleArrayOfNumbers)
      .pipe(exhaustMap(x => of(x * 2).pipe(delay(1000))))
      .subscribe({
        next: x => this.ignoreNewEmissionsWhilePreviousOnesAreProcessingResults.push(`exhaustMap: ${x}`),
        error: err => this.ignoreNewEmissionsWhilePreviousOnesAreProcessingResults.push(`Error: ${err}`),
        complete: () => this.ignoreNewEmissionsWhilePreviousOnesAreProcessingResults.push('Completed')
      });
  }

  retryOnErrorThreeTimes() {
    of(...data.arraysWithGotchas)
      .pipe(
        map(x => { if (x === null) throw new Error('Null value'); return x; }),
        retry(3)
      )
      .subscribe({
        next: x => this.retryOnErrorThreeTimesResults.push(`retry: ${x}`),
        error: err => this.retryOnErrorThreeTimesResults.push(`Error: ${err}`),
        complete: () => this.retryOnErrorThreeTimesResults.push('Completed')
      });
  }
  emitValuesUntilClickEvent() {
    of(...data.simpleArrayOfNumbers)
      .pipe(takeUntil(fromEvent(document, 'click')))
      .subscribe({
        next: x => this.emitValuesUntilClickEventResults.push(`takeUntil: ${x}`),
        error: err => this.emitValuesUntilClickEventResults.push(`Error: ${err}`),
        complete: () => this.emitValuesUntilClickEventResults.push('Completed')
      });
  }

}




