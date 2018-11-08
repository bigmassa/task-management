import * as _ from 'lodash';
import * as actions from '../state/actions';

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getDailyTimeTotalForUser, getIsDaySignedOffRequired } from '../state/selectors/timesheet';

import { AppState } from '../state/state';
import { Observable } from 'rxjs';
import { getTimeEntriesForUserAndDay } from '../state/selectors/timeentry';
import { take } from 'rxjs/operators';

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
        this.store.pipe(
            select(getTimeEntriesForUserAndDay(this.date, this.user)),
            take(1)
        ).subscribe(
            objs => {
                _.each(objs, o => {
                    if (!o.signed_off) {
                        const payload = { id: o.id, signed_off: true };
                        this.store.dispatch({type: actions.TimeEntryActions.PATCH, payload});
                    }
                })
            }
        )
    }
}
