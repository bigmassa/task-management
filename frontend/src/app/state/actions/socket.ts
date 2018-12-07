import { Action } from '@ngrx/store';
import { IActionWithPayload } from '../models';
import { ISocketPayload } from '../effects/socket';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SocketActions {

    public static START = '[Socket] START';
    public static PROCESS_MESSAGE = '[Socket] PROCESS_MESSAGE';

    public Start(): Action {
        return { type: SocketActions.START };
    }

    public ProcessMessage(payload: ISocketPayload): IActionWithPayload {
        return { type: SocketActions.PROCESS_MESSAGE, payload };
    }
}
