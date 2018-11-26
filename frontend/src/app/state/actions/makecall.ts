import { IActionWithPayload, IMakeCall } from '../models';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MakeCallActions {

    static MAKE_CALL = '[MakeCall] MAKE_CALL';
    static MAKE_CALL_SUCCESS = '[MakeCall] MAKE_CALL_SUCCESS';

    MakeCall(payload: IMakeCall): IActionWithPayload {
        return { type: MakeCallActions.MAKE_CALL, payload };
    }

    MakeCallSuccess(payload: IMakeCall): IActionWithPayload {
        return { type: MakeCallActions.MAKE_CALL_SUCCESS, payload };
    }
}
