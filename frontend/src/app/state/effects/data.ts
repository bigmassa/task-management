import * as actions from '../actions';
import * as moment from 'moment';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { IActionWithHTTPData } from '../models';
import { Injectable } from '@angular/core';
import { mergeMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DataEffects {

    @Effect() loadData$ = this.updates$.pipe(
        ofType(actions.DataActions.LOAD_DATA),
        mergeMap(
            () => {
                const fromDate: IActionWithHTTPData = {
                    params: {
                        date_from: moment().add(-2, 'months').format('YYYY-MM-DD')
                    }
                }
                return [
                    new actions.TaskActions().LoadAll(),
                    new actions.TaskNoteActions().LoadAll(),
                    new actions.JobActions().LoadAll(),
                    new actions.JobNoteActions().LoadAll(),
                    new actions.ClientActions().LoadAll(),
                    new actions.TimeDailySignoffActions().LoadAll(fromDate),
                    new actions.TimeEntryActions().LoadAll(fromDate),
                    new actions.BillingFrequencyActions().LoadAll(),
                    new actions.ClientContactActions().LoadAll(),
                    new actions.JobFileActions().LoadAll(),
                    new actions.JobRecurringCostActions().LoadAll(),
                    new actions.JobRelationshipActions().LoadAll(),
                    new actions.JobStatusActions().LoadAll(),
                    new actions.JobTypeActions().LoadAll(),
                    new actions.MeActions().Load(),
                    new actions.PaymentOptionActions().LoadAll(),
                    new actions.PositionActions().LoadAll(),
                    new actions.RecurringCostTypeActions().LoadAll(),
                    new actions.RelationshipActions().LoadAll(),
                    new actions.TaskAssigneeActions().LoadAll(),
                    new actions.TaskStatusActions().LoadAll(),
                    new actions.UserActions().LoadAll()
                ];
            }
        )
    );

    constructor(
        private updates$: Actions
    ) {}
}
