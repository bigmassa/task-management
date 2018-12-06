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
                const timeEntryParams: IActionWithHTTPData = {
                    params: {
                        date_from: moment().add(-5, 'weeks').format('YYYY-MM-DD')
                    }
                }
                const taskParams: IActionWithHTTPData = {
                    params: {
                        live_at_date: moment().add(-12, 'weeks').format('YYYY-MM-DD')
                    }
                }
                return [
                    // user
                    new actions.MeActions().Load(),
                    new actions.UserActions().LoadAll(),
                    // lookups
                    new actions.BillingFrequencyActions().LoadAll(),
                    new actions.JobStatusActions().LoadAll(),
                    new actions.JobTimingActions().LoadAll(),
                    new actions.JobTypeActions().LoadAll(),
                    new actions.PaymentOptionActions().LoadAll(),
                    new actions.PositionActions().LoadAll(),
                    new actions.RecurringCostTypeActions().LoadAll(),
                    new actions.RelationshipActions().LoadAll(),
                    new actions.TagActions().LoadAll(),
                    new actions.TaskStatusActions().LoadAll(),
                    // main data
                    new actions.ClientActions().LoadAll(),
                    new actions.ClientContactActions().LoadAll(),
                    new actions.ClientContactTagActions().LoadAll(),
                    new actions.JobActions().LoadAll(),
                    new actions.JobFileActions().LoadAll(),
                    new actions.JobNoteActions().LoadAll(),
                    new actions.JobRecurringCostActions().LoadAll(),
                    new actions.JobRelationshipActions().LoadAll(),
                    new actions.TaskActions().LoadAll(taskParams),
                    new actions.TaskAssigneeActions().LoadAll(taskParams),
                    new actions.TaskFileActions().LoadAll(taskParams),
                    new actions.TaskTagActions().LoadAll(),
                    new actions.TaskNoteActions().LoadAll(taskParams),
                    new actions.TaskTimingActions().LoadAll(taskParams),
                    new actions.TimeEntryActions().LoadAll(timeEntryParams)
                ];
            }
        )
    );

    constructor(
        private updates$: Actions
    ) {}
}
