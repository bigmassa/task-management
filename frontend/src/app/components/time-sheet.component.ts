import { AppState } from '../state/state';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
    selector: 'time-sheet, [time-sheet]',
    templateUrl: './time-sheet.component.html',
    host: {'class': 'd-flex flex-fill flex-column'}
})
export class TimesheetComponent {

    constructor(private store: Store<AppState>) { }

}
