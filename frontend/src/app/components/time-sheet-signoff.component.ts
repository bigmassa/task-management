import * as _ from 'lodash';
import * as actions from '../state/actions';
import * as moment from 'moment';

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getDailyTimeSignoffForUser, getDailyTimeTotalForUser } from '../state/selectors/timesheet';

import { AppState } from '../state/state';
import { ITimeDailySignoff } from './../state/reducers/timedailysignoff';
import { Observable } from 'rxjs';

@Component({
    selector: 'time-sheet-signoff, [time-sheet-signoff]',
    template: `
    <span class="checkbox fc-dailycontrol">
        <label>
            <ng-container *ngIf="signoff$ | async as signoff; else emptyTemplate">
                <input #ckb type="checkbox" [checked]="signoff.completed" (change)="changeSignoff(ckb.checked, signoff)">
            </ng-container>
            <span></span><em>{{ sum$ | async }}</em>
        </label>
    </span>

    <ng-template #emptyTemplate>
        <input #ckb type="checkbox" (change)="changeSignoff(ckb.checked)">
    </ng-template>
    `
})
export class TimesheetSignoffComponent implements OnChanges {

    @Input() date: Date;
    @Input() user: number;

    checked: boolean;
    signoff$: Observable<ITimeDailySignoff>;
    sum$: Observable<any>;

    constructor(private store: Store<AppState>) { }

    ngOnChanges(changes: SimpleChanges) {
        if (this.user && this.date) {
            this.signoff$ = this.store.pipe(select(getDailyTimeSignoffForUser(this.user, this.date)));
            this.sum$ = this.store.pipe(select(getDailyTimeTotalForUser(this.user, this.date)));
        }
    }
    
    changeSignoff(checked: boolean, originalData = null) {
        if (originalData) {
            const payload = {
                id: originalData.id,
                completed: checked
            };
            this.store.dispatch({type: actions.TimeDailySignoffActions.PATCH, payload});
        } else {
            const payload = {
                date: moment(this.date).format('YYYY-MM-DD'),
                user: this.user,
                completed: checked
            };
            this.store.dispatch({type: actions.TimeDailySignoffActions.ADD, payload});
        }
    }
}
