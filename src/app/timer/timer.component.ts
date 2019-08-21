import { Component, OnInit } from '@angular/core';
import { interval as rxjsInterval} from 'rxjs/observable/interval';

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
})
export class TimerComponent {

  started: boolean;
  minutes: number;
  seconds: number;
  newMin: number;
  interval: any;

  constructor() {
    this.reset();
  }

  resetVariables(mins, secs, started) {
    this.started = started;
    this.minutes = mins;
    this.seconds = secs;
  }

  start() {
    if (this.started || (this.minutes === 0 && this.seconds === 0)) {
      return;
    }

    this.started = true;
    const counter = rxjsInterval(1000);
    this.interval = counter.subscribe(this.intervalCallback.bind(this))
  }

  addFive() {
    this.minutes += 5;
  }

  minusFive() {
    if (this.minutes > 5) {
      this.minutes -= 5;
      return;
    }
    this.minutes = 0
  }

  stop() {
    this.started = false;
    if (this.interval) {
      this.interval.unsubscribe();
    }
  }

  reset() {
    this.stop();
    this.minutes = 25;
    this.seconds = 0;
  }

  intervalCallback() {
    if (this.minutes === 0 && this.seconds === 0) {
      this.stop();
      return;
    }

    if (this.seconds > 0) {
      this.seconds--;
      return;
    }

    if (this.minutes > 0) {
      this.minutes--;
      this.seconds = 59;
    }
  }

}
