import { APIBaseEffects } from '../api';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Effect, ofType } from '@ngrx/effects';
import { HttpActions } from '../actions';
import { IActionWithPayload } from '../models';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

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
                map(data => ({type: `${this.prefix} SIGNOFF_SUCCESS`, payload: data})),
                catchError(res => of({type: HttpActions.HTTP_ERROR, payload: res}))
            )
        )
    )

}
