import { of } from 'rxjs';
import { catchError, delay, filter, map, mergeMap, retryWhen } from 'rxjs/operators';
import { webSocket } from 'rxjs/webSocket';
import { Globals } from 'src/app/services/globals';

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { SocketActions } from '../actions/socket';

export interface ISocketPayload {
    type: string;
    action: string;
    pk: number;
    model: string;
    data: any;
}

@Injectable({
    providedIn: 'root'
})
export class SocketEffects {

    @Effect() public start$ = this.updates$.pipe(
        ofType(SocketActions.START),
        delay(1),
        mergeMap(
            (data) => webSocket(this.glogals.dataSocketUrl).pipe(
                retryWhen((res) => res.pipe(delay(this.glogals.dataSocketRetryDelay)))
            )
        ),
        catchError(() => of(null)),
        filter((res) => !!res),
        map((res: ISocketPayload) => this.actions$.ProcessMessage(res))
    );

    constructor(
        private updates$: Actions,
        private actions$: SocketActions,
        private glogals: Globals
    ) {}
    
}
