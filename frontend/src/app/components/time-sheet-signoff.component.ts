import * as _ from 'lodash';
import * as actions from '../state/actions';
import * as moment from 'moment';
import { AppState } from '../state/state';
import {
    Component,
    Input,
    OnChanges,
    SimpleChanges
    } from '@angular/core';
import { getDailyTimeTotalForUser, getIsDaySignedOffRequired } from '../state/selectors/timesheet';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';



@Component({
    selector: 'time-sheet-signoff, [time-sheet-signoff]',
    template: `
    <span class="checkbox fc-dailycontrol">
        <label>
            <input type="checkbox" (change)="signOff()" *ngIf="requiresSignOff$ | async; else complete">
            <ng-template #complete><input type="checkbox" [checked]="true" disabled></ng-template>
            <span></span><em>{{ sum$ | async }}</em>
        </label>
    </span>
    `
})
export class TimesheetSignoffComponent implements OnChanges {

    @Input() date: Date;
    @Input() user: number;

    checked: boolean;
    requiresSignOff$: Observable<boolean>;
    sum$: Observable<any>;

    constructor(private store: Store<AppState>) { }

    ngOnChanges(changes: SimpleChanges) {
        if (this.user && this.date) {
            this.requiresSignOff$ = this.store.pipe(select(getIsDaySignedOffRequired(this.user, this.date)));
            this.sum$ = this.store.pipe(select(getDailyTimeTotalForUser(this.user, this.date)));
        }
    }
    
    signOff() {
        const payload = {date: moment(this.date).format('YYYY-MM-DD'), user: this.user}
        this.store.dispatch({type: actions.TimeEntrySignoffActions.SIGNOFF, payload});
    }
}
