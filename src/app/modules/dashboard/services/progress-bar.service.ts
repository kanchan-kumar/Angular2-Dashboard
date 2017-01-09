import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Logger } from 'angular2-logger/core';

@Injectable()
export class ProgressBarService {

  /*Observable string sources.*/
  private toggleProgressBarService = new Subject<string>();

  /*Service Observable for getting Progress Bar Toggle Action.*/
  progressBarProvider$ =  this.toggleProgressBarService.asObservable();

  private display: boolean = false;
  private title: string = 'Please wait ...';
  private minWidth: number = 400;
  private minHeight: number = 150;
  private width: number = 300;
  private height: any = 'auto';
  private modal: boolean = true;
  private parentElement: string = null;
  private message: string = 'Processing data. Please wait ...';

  constructor(private log: Logger) { }

  /*Service message commands for enabling progress bar.*/
  startProgressBar(message?: string, title?: string) {

    /* Clearing values here. */
    this.display = true;

    if(message !== null || message !== undefined) {
      this.message = message;
    }
    if(title !== null || title !== undefined) {
      this.title = title;
    }
    /*Observable string streams.*/
    this.toggleProgressBarService.next('on');
  }

  /*Service message commands for disabling progress bar.*/
  stopProgressBar() {

    /* Clearing values here. */
    this.display = false;
    this.message = 'Processing data. Please wait ...';
    this.title = 'Please wait ...';
    /*Observable string streams.*/
    this.toggleProgressBarService.next('off');
  }

  public get $display(): boolean  {
    return this.display;
  }

  public set $display(value: boolean ) {
    this.display = value;
  }

  public get $title(): string  {
    return this.title;
  }

  public set $title(value: string ) {
    this.title = value;
  }

  public get $minWidth(): number  {
    return this.minWidth;
  }

  public set $minWidth(value: number ) {
    this.minWidth = value;
  }

  public get $minHeight(): number  {
    return this.minHeight;
  }

  public set $minHeight(value: number ) {
    this.minHeight = value;
  }

  public get $width(): number  {
    return this.width;
  }

  public set $width(value: number ) {
    this.width = value;
  }

  public get $height(): any  {
    return this.height;
  }

  public set $height(value: any ) {
    this.height = value;
  }

  public get $modal(): boolean  {
    return this.modal;
  }

  public set $modal(value: boolean ) {
    this.modal = value;
  }

  public get $parentElement(): string  {
    return this.parentElement;
  }

  public set $parentElement(value: string ) {
    this.parentElement = value;
  }

  public get $message(): string  {
    return this.message;
  }

  public set $message(value: string ) {
    this.message = value;
  }

}
