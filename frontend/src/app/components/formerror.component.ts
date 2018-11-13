import { Component, Input } from '@angular/core';

import { FormControl } from '@angular/forms';

@Component({
    selector: 'formError, [formError]',
    template: `
    <ng-container *ngIf="control.invalid && (control.dirty || control.touched)">
        <ng-content></ng-content>
    </ng-container>
    `
})
export class FormErrorComponent {

    @Input('formError') control: FormControl;

}
