import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Effect, ofType } from '@ngrx/effects';

import { HttpActions, TimeEntryActions } from '../actions';
import { APIBaseEffects } from '../api';
import { IActionWithPayload } from '../models';

@Injectable({
    providedIn: 'root'
})
export class TimeEntrySignoffEffects extends APIBaseEffects {
    protected url = '/api/time-entry-signoff/';
    protected prefix = '[TimeEntrySignoff]';

    @Effect() signoff$ = this.updates$.pipe(
        ofType(`${this.prefix} SIGNOFF`),
        map((action: IActionWithPayload) => action.payload),
        mergeMap(payload =>
            this.service$.post(this.apiUrl, payload).pipe(
                map(data => ({type: TimeEntryActions.REPLACE_MANY, payload: data})),
                catchError(res => of({type: HttpActions.HTTP_ERROR, payload: res}))
            )
        )
    )

}
