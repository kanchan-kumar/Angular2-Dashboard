import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProgressBarService } from '../../services/progress-bar.service';
import { Subscription }   from 'rxjs/Subscription';
import { Logger } from 'angular2-logger/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'dashboard-progress-bar',
  templateUrl: './dashboard-progress-bar.component.html',
  styleUrls: ['./dashboard-progress-bar.component.scss']
})
export class DashboardProgressBarComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private progress: Subscription;
  private timer: any;

  display: boolean = false;
  title: string = '...';
  minWidth: number = 150;
  minHeight: number = 150;
  width: number = 300;
  height: any = 'auto';
  modal: boolean = true;
  parentElement: string = null;
  message: string = '';
  progressValue: number = 10;

  constructor(private _progressService: ProgressBarService, private log: Logger) {

    /* Binding Values from service. */
    this.display = _progressService.$display;
    this.title = _progressService.$title;
    this.minWidth = _progressService.$minWidth;
    this.minHeight = _progressService.$minHeight;
    this.modal = _progressService.$modal;
    this.parentElement = _progressService.$parentElement;
    this.width = _progressService.$width;
    this.height = _progressService.$height;
    this.message = _progressService.$message;

    /* Creating Timer Here. */
    this.timer = Observable.timer(0, 1000);

    try {
       /*Listening Event.*/
        this.subscription = _progressService.progressBarProvider$.subscribe(

          /*Getting Event Here.*/
          value => {
            this.log.debug('Getting Event in progress component with value = ' + value);

            /* When enabling progress bar. */
            if (value === 'on') {
              this.display = this._progressService.$display;
              this.title = this._progressService.$title;
              this.message = this._progressService.$message;

              /* Starting Progress Timer. */
              this.startProgressTimer();
            }else if (value === 'off') {
              this.display = this._progressService.$display;
              this.title = this._progressService.$title;
              this.message = this._progressService.$message;

              /* Stopping Progress Timer. */
              this.stopProgressTimer();
            } else  {
              this.log.log('Getting un identified Event in progress component. value = ' +  value);
            }
          }
        );
      } catch (e) {
      this.log.error('Error in progress bar component.', e);
    }
  }

  /* Starting progress timer. */
  startProgressTimer() {
    try {
      /* subscribing to a observable returns a subscription object. */
      this.progress = this.timer.subscribe(t => this.calculateProgress(t));
    } catch( e) {
      this.log.error('Error while starting progress timer', e);
    }
  }

  /* Calculating Progress. */
  calculateProgress(tick: number) {
    try {

      if (this.progressValue < 50) {
        this.progressValue += 5;
      } else if (this.progressValue < 70) {
        this.progressValue += 3;
      } else if ( this.progressValue < 80 ) {
        this.progressValue += 2;
      } else if (this.progressValue < 90) {
        this.progressValue += 1;
      } else if (this.progressValue < 99) {
        this.progressValue += 0.1;
      }
    } catch (e) {
      this.log.error('Error while calculating progress of progress bar.', e);
    }
  }

  /* Stopping the timer. */
  stopProgressTimer() {
    try {
      if(this.progress !== null) {
        this.progress.unsubscribe();
      }

      /* clear previous values. */
      this.progressValue = 0;

    } catch( e) {
      this.log.error('Error while stopping progress timer', e);
    }
  }

  /* Listening on dialog close event. */
  onAfterHide($event) {
    this.log.debug('Progress Bar running in background. Stopping Timer.');
    this.stopProgressTimer();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.progress.unsubscribe();
  }
}
