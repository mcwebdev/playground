import { Component } from '@angular/core';

@Component({
  selector: 'app-keywords',
  templateUrl: './keywords.component.html',
  styleUrls: ['./keywords.component.scss']
})
export class KeywordsComponent {
  code: string = `// Promise Constructor with Executor Function
const myPromise = new Promise((resolve, reject) => {
  let condition = true;  // Change to false to see rejection
  if (condition) {
    resolve('Promise is resolved!');
  } else {
    reject('Promise is rejected!');
  }
});

// then() and catch()
myPromise
  .then(value => {
    console.log(value);  // Output: Promise is resolved!
    return 'Next value';
  })
  .catch(error => {
    console.error(error);
  })
  .finally(() => {
    console.log('Execution finished');
  });

// Promise.all() and Promise.race()
const promise1 = Promise.resolve('Promise 1 resolved');
const promise2 = new Promise(resolve => setTimeout(resolve, 200, 'Promise 2 resolved'));
const promise3 = Promise.reject('Promise 3 rejected');

Promise.all([promise1, promise2])
  .then(values => {
    console.log(values);  // Output: ['Promise 1 resolved', 'Promise 2 resolved']
  })
  .catch(error => {
    console.error(error);
  });

Promise.race([promise1, promise2, promise3])
  .then(value => {
    console.log(value);  // Output: Promise 1 resolved
  })
  .catch(error => {
    console.error(error);
  });

// async/await
async function asyncFunction() {
  try {
    const value = await myPromise;
    console.log(value);  // Output: Promise is resolved!
  } catch (error) {
    console.error(error);
  } finally {
    console.log('Async function execution finished');
  }
}

asyncFunction();

// Chaining
myPromise
  .then(value => {
    console.log(value);  // Output: Promise is resolved!
    return Promise.resolve('Second promise resolved');
  })
  .then(value => {
    console.log(value);  // Output: Second promise resolved
  })
  .catch(error => {
    console.error(error);
  });

  // Console Output:
  // Promise is resolved!
  // Execution finished
  // Promise is resolved!
  // ['Promise 1 resolved', 'Promise 2 resolved']
  // Promise 1 resolved
  // Promise is resolved!
  // Async function execution finished
  // Second promise resolved

`
}
