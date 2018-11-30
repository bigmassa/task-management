import autoScroll from 'dom-autoscroller';
import {
    AfterViewInit,
    Directive,
    ElementRef,
    Input
    } from '@angular/core';

@Directive({
    selector: 'autoScroll, [autoScroll]'
})
export class AutoScrollDirective implements AfterViewInit {

    constructor(private element: ElementRef) { }

    @Input() scrollMargin: number = 50;
    @Input() scrollMaxSpeed: number = 20;
    @Input() scrollWhenOutside: boolean = true;

    ngAfterViewInit() {
        autoScroll([
            this.element.nativeElement
        ], {
            margin: this.scrollMargin,
            maxSpeed: this.scrollMaxSpeed,
            scrollWhenOutside: this.scrollWhenOutside,
            autoScroll: function() {
                return this.down;
            }
        });
    }

}
