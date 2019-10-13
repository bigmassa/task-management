import { 
    Component, 
    ElementRef, 
    HostListener,
    Input 
} from '@angular/core';

@Component({
    selector: 'markdown-field, [markdownField]',
    template: `
    <ng-container [ngSwitch]="showBackingField">
        <ng-content *ngSwitchCase="true"></ng-content>
        <div class="markdown-container" *ngSwitchDefault (click)="show()">
            <markdown [data]="text"></markdown>
        </div>
    </ng-container>
    `
})
export class MarkdownField {
    @Input() text: string;

    showBackingField: boolean;
    clickedInside: boolean;

    constructor(private eRef: ElementRef) { }

    @HostListener('click')
    clickInside() {
        this.clickedInside = true;
    }

    @HostListener('document:click')
    clickout() {
        if (!this.clickedInside) this.showBackingField = false;
        this.clickedInside = false;
    }

    show() {
        this.showBackingField = true;
    }
}