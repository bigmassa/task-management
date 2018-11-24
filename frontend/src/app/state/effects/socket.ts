import { Actions, Effect, ofType } from '@ngrx/effects';
import {
    catchError,
    delay,
    filter,
    map,
    mergeMap,
    retryWhen,
    takeUntil
    } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { SocketActions } from '../actions/socket';
import { webSocket } from 'rxjs/webSocket';
import { Globals } from 'src/app/services/globals';

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

    constructor(
        private updates$: Actions,
        private actions$: SocketActions,
        private glogals: Globals
    ) {}

    @Effect() public start$ = this.updates$.pipe(
        ofType(SocketActions.START),
        delay(1),
        mergeMap(
            (data) =>
                webSocket(this.glogals.dataSocketUrl).pipe(
                    retryWhen((res) => res.pipe(delay(this.glogals.dataSocketRetryDelay))),
                    takeUntil(this.updates$.ofType(SocketActions.STOP))
                )
            ),
        catchError(() => of(null)),
        filter((res) => !!res),
        map((res: ISocketPayload) => this.actions$.ProcessMessage(res))
    );

}
