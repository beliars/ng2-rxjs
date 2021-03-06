import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Rx';
import 'rxjs/Rx';

@Component({
  selector: 'learn-rxjs',
  templateUrl: 'learn-rxjs.component.html',
  styleUrls: ['learn-rxjs.component.scss']
})
export class LearnRxjsComponent {
  title = 'Learn Rxjs!';
  
  ngOnInit() {
    console.log('Immutable init!');
  }
  
  ngAfterContentInit() {
    
    /* Observable */
    
    let test1 = document.querySelector('.test1');
    Observable.fromEvent(test1, 'click')
    .subscribe(() => console.log('Clicked!'));
    
    let test2 = document.querySelector('.test2');
    Observable.fromEvent(test2, 'click')
    .throttleTime(1000)
    .scan((count: number) => count + 1, 0)
    .subscribe(count => console.log(`Clicked ${count} times`));
    
    let clickPos$ = Observable.fromEvent(document, 'click');
    
    clickPos$
    .map((event: MouseEvent) => {
      let coords = {
        x: event.clientX,
        y: event.clientY
      };
      return coords;
    })
    //.subscribe(coords => {
    //  console.log(`clientX: ${coords.x}`);
    //  console.log(`clientY: ${coords.y}`);
    //});
    
    let observable = Observable.create(function(observer) {
      observer.next(100);
      observer.next(200);
      observer.next(300);
      setTimeout(() => {
        observer.next(400);
        observer.complete();
      }, 2000);
    });
    
    //console.log('just before subscribe');
    //observable.subscribe({
    //  next: x => console.log('got value ' + x),
    //  error: err => console.error('something wrong occurred: ' + err),
    //  complete: () => console.log('completed')
    //});
    //console.log('just after subscribe');
    
    let tick$ = Observable.create((observer) => {
      let interval = setInterval(() => {
        observer.next('Tick 1 observer');
      }, 1000);
    });
    
    let subscription = tick$.subscribe((x) => console.log(x));
    
    let tick2$ = Observable.create((observer) => {
      let interval = setInterval(() => {
        observer.next('Tick 2 observer');
      }, 2000);
    });
    
    let childSubscription = tick2$.subscribe((x) => console.log(x));
    subscription.add(childSubscription);
    
    setTimeout(() => {
      subscription.unsubscribe();
    }, 10000);
    
    
    /* Operators */
    
    function multiplyByTen(input) {
      let output = Observable.create(function subscribe(observer) {
        input.subscribe({
          next: (v) => observer.next(10 * v),
          error: (err) => observer.error(err),
          complete: () => observer.complete()
        });
      });
      return output;
    }
    
    let input = Observable.from([1, 2, 3, 4]);
    let output = multiplyByTen(input);
    output.subscribe(x => console.log(x));
    
    
    let test3 = document.querySelector('.test3');
    
    let click$ = Observable.fromEvent(test3, 'click');
    
    click$
    .delay(2000)
    .subscribe(() => console.log('Delayed click!'));
    
    let arr$ = Observable.of('foo', 'bar', 'text', 'title');
    
    arr$
    .subscribe(res => console.log(res));
    
    
    /* Tutorial */
    
    /* Controlling the flow */
    
    let test4 = document.querySelector('.test4');
    
    let input$ = Observable.fromEvent(test4, 'input');
    
    input$
    .filter((event: any) => event.target.value.length > 2)
    .take(3)
    .subscribe(value => console.log(value));
    
    let test6 = Observable.fromEvent(document.querySelector('.test6'), 'input');
    test6
    .map((event: any) => event.target.value.toUpperCase())
    .subscribe(res => console.log(res));
    
    let obj$ = Observable.from([
      {name: 'John', age: 30},
      {name: 'Sarah', age: 35},
      {name: 'Sarah', age: 35}
    ]);
    
    obj$
    .pluck('name')
    .distinct()
    .subscribe(res => console.log(res));
    
    let test7 = Observable.fromEvent(document.querySelector('.test7'), 'click');
    
    /* Increase button */
    
    let increaseButton = document.querySelector('#increase');
    let increase = Observable.fromEvent(increaseButton, 'click')
    .map(() => state => Object.assign({}, state, {count: state.count + 1}));
    
    let decreaseButton = document.querySelector('#decrease');
    let decrease = Observable.fromEvent(decreaseButton, 'click')
    .map(() => state => Object.assign({}, state, {count: state.count - 1}));
    
    //let state = increase.scan((state, changeFn) => changeFn(state), {count: 0});
    
    let state = Observable.merge(increase, decrease)
    .scan((state, changeFn) => changeFn(state), {count: 0});
    
    state.subscribe((state: any) => {
      document.querySelector('#count').innerHTML = state.count;
    });

    /* Subject */

    let subject = new Subject();

    subject.subscribe({
      next: (v) => console.log('ObserverA: ' + v)
    });

    subject.subscribe({
      next: (v) => console.log('ObserverB: ' + v),
      complete: () => console.log('ObserverB complete')
    });

    subject.subscribe((v) => console.log('ObserverC ' + v));

    let testObservable = Observable.from([555, 777, 999]); 

    testObservable.subscribe(subject);

    // subject.next(555);
    // subject.next(777);
    // subject.next(999);
    subject.complete();


    /* Multicasted Observables */


    let source = Observable.from([1111, 2222, 3333]);
    let testSubject = new Subject();
    let multicasted = source.multicast(testSubject);

        // These are, under the hood, `subject.subscribe({...})`:

    multicasted.subscribe({
      next: (v) => console.log('multicastedObserverA: ' + v)
    });
    multicasted.subscribe({
      next: (v) => console.log('multicastedObserverB: ' + v)
    });

    multicasted.connect();
    
  }
   
   route = '/one/two/three/four';
   subRoute1 = '/one/two/';
   subRoute2 = '/one/two/three';
   subRoute3 = '/two/three';
   subRoute4 = '/two/three/qwe';
   
   checkRoute(route, subroute) {
     
    let mainArr = route.split('/');
    let subArr = subroute.split('/');
    let check = true;
    //console.log(mainArr);
  
     for (let i = 0; i<subArr.length; i++) {
       if (mainArr[i] == subArr[i]) {
         continue;
       }
       else {
         check = false;
         break;
       }
     }
     return console.log(check);
   }
  
    constructor() {
      this.checkRoute(this.route, this.subRoute2);
    }
}


