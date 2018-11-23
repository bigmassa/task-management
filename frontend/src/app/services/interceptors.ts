import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as actions from '../state/actions';
import { AppState } from '../state/state';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

    constructor(private store: Store<AppState>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.method !== 'GET') {
            return next.handle(req);
        }

        this._requestStarted();

        return next.handle(req).pipe(
            finalize(() => this._requestEnded())
        );

    }

    private _requestStarted() {
        this.store.dispatch({ type: actions.HttpActions.INCREMENT_PENDING });
    }

    private _requestEnded() {
        this.store.dispatch({ type: actions.HttpActions.DECREMENT_PENDING });
    }

}
