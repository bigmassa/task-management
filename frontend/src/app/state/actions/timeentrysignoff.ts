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

    Signoff(payload: ITimeEntrySignoff): IActionWithPayload {
        return { type: TimeEntrySignoffActions.SIGNOFF, payload };
    }

}
