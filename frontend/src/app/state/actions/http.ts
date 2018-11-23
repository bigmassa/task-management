import { HttpErrorResponse } from '@angular/common/http';
import { IActionWithPayload } from '../models';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable({
    providedIn: 'root'
})
export class HttpActions {

    static HTTP_ERROR = '[Http] HTTP_ERROR';
    static INCREMENT_PENDING = '[Http] INCREMENT_PENDING';
    static DECREMENT_PENDING = '[Http] DECREMENT_PENDING';

    HttpError(payload: HttpErrorResponse): IActionWithPayload {
        return { type: HttpActions.HTTP_ERROR, payload };
    }

    IncrementPending(): Action {
        return { type: HttpActions.INCREMENT_PENDING };
    }

    DecrementPending(): Action {
        return { type: HttpActions.DECREMENT_PENDING };
    }

}
