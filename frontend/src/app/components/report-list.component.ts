import { AppState } from '../state/state';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
    selector: 'report-list, [report-list]',
    templateUrl: './report-list.component.html',
    host: {'class': 'd-flex flex-fill flex-column'}
})
export class ReportListComponent {

    constructor(private store: Store<AppState>) { }

}
