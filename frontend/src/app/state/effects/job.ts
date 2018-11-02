import { Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { APIBaseEffects } from '../api';
import { HttpActions } from '../actions';
import { IActionWithPayload } from '../models';
import { Injectable } from '@angular/core';
import { TaskActions } from './../actions/task';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class JobEffects extends APIBaseEffects {
    protected url = '/api/jobs/';
    protected prefix = '[Job]';

    @Effect() all$ = this._all$(
        `${this.prefix} LOAD_ALL`,
        `${this.prefix} LOAD_ALL_SUCCESS`
    );
    @Effect() one$ = this._one$(
        `${this.prefix} LOAD_ONE`,
        `${this.prefix} LOAD_ONE_SUCCESS`
    );
    @Effect() add$ = this._add$(
        `${this.prefix} ADD`,
        `${this.prefix} ADD_SUCCESS`
    );
    @Effect() update$ = this._update$(
        `${this.prefix} UPDATE`,
        `${this.prefix} UPDATE_SUCCESS`
    );
    @Effect() remove$ = this._remove$(
        `${this.prefix} REMOVE`,
        `${this.prefix} REMOVE_SUCCESS`
    );
    @Effect() sortTasks$ = this.updates$.pipe(
        ofType(`${this.prefix} SORT_TASKS`),
        map((action: IActionWithPayload) => action.payload),
        mergeMap(obj =>
            this.service$.post(`${this.apiUrl}${obj.id}/sort-tasks/`, obj).pipe(
                map(data => ({type: TaskActions.REPLACE_MANY, payload: data})),
                catchError(res => of({type: HttpActions.HTTP_ERROR, payload: {err: res, data: obj}}))
            )
        )
    );
}
