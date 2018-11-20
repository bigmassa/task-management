import { Action } from '@ngrx/store';
import { IActionWithPayload } from '../models';
import { Injectable } from '@angular/core';
import { ITab, ITabs } from '../reducers/tabs';

@Injectable({
    providedIn: 'root'
})
export class TabActions {

    static CLIENT_ACTIVATE_TAB = '[Tabs] CLIENT_ACTIVATE_TAB';
    static JOB_ACTIVATE_TAB = '[Tabs] JOB_ACTIVATE_TAB';

    ClientActivate(payload: ITab): IActionWithPayload {
        return { type: TabActions.CLIENT_ACTIVATE_TAB, payload };
    }

    JobActivate(payload: ITab): IActionWithPayload {
        return { type: TabActions.JOB_ACTIVATE_TAB, payload };
    }
}
