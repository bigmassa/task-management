import { APIBaseEffects } from '../api';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Effect, ofType } from '@ngrx/effects';
import { HttpActions } from '../actions';
import { IActionWithPayload } from '../models';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { TaskActions } from './../actions/task';


@Injectable({
    providedIn: 'root'
})
export class MakeCallEffects extends APIBaseEffects {
    protected url = '/api/make-call/';
    protected prefix = '[MakeCall]';

    @Effect() call$ = this.updates$.pipe(
        ofType(`${this.prefix} MAKE_CALL`),
        map((action: IActionWithPayload) => action.payload),
        mergeMap(obj =>
            this.service$.post(`${this.apiUrl}call/`, obj).pipe(
                map(data => ({type: `${this.prefix} MAKE_CALL_SUCCESS`, payload: data})),
                catchError(res => of({type: HttpActions.HTTP_ERROR, payload: {err: res, data: obj}}))
            )
        )
    );
}
