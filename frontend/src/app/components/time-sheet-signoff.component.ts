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
    <ng-container *ngIf="requiresSignOff$ | async; else complete">
        <a class="pointer d-inline-block" (click)="signOff()" title="Requires Signoff">
            <i class="icon-circle mr-0-5"></i><em>{{ sum$ | async }}</em>
        </a>
    </ng-container>
    <ng-template #complete>
        <span class="d-inline-block c-olive">
            <i class="icon-ok-circled mr-0-5"></i><em>{{ sum$ | async }}</em>
        </span>
    </ng-template>
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
