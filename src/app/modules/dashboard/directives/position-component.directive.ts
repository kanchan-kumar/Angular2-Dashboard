import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[positionComponent]'
})
export class PositionComponentDirective implements AfterViewInit {
private el: any;
    @Input() positioningFromParent: string = '';
    @Input() additionalPixels: number = 0;

    constructor(el: ElementRef) {
        this.el = el.nativeElement;
    }
   ngAfterViewInit() {
     let v = this.el.parentNode.getBoundingClientRect()[this.positioningFromParent]
     this.el.style['width'] = '300px';
     console.log('Setted thing ', this.el.style, v, this.el.parentNode);
   }
}
