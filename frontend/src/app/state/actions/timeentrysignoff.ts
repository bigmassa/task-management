import { IActionWithPayload } from '../models';
import { Injectable } from '@angular/core';

export interface ITimeEntrySignoff {
    date: string;
    user: number;
}

@Injectable({
    providedIn: 'root'
})
export class TimeEntrySignoffActions {

    static SIGNOFF = '[TimeEntrySignoff] SIGNOFF';
    static SIGNOFF_SUCCESS = '[TimeEntrySignoff] SIGNOFF_SUCCESS';

    Signoff(payload: ITimeEntrySignoff): IActionWithPayload {
        return { type: TimeEntrySignoffActions.SIGNOFF, payload };
    }

    SignoffSuccess(payload: ITimeEntrySignoff): IActionWithPayload {
        return { type: TimeEntrySignoffActions.SIGNOFF_SUCCESS, payload };
    }
}
