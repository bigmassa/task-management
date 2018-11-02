import { IActionWithHTTPData, IActionWithPayload } from '../models';

import { Action } from '@ngrx/store';
import { ITimeDailySignoff } from '../reducers/timedailysignoff';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TimeDailySignoffActions {

    static LOAD_ALL = '[TimeDailySignoff] LOAD_ALL';
    static LOAD_ALL_SUCCESS = '[TimeDailySignoff] LOAD_ALL_SUCCESS';
    static LOAD_ONE = '[TimeDailySignoff] LOAD_ONE';
    static LOAD_ONE_SUCCESS = '[TimeDailySignoff] LOAD_ONE_SUCCESS';
    static ADD = '[TimeDailySignoff] ADD';
    static ADD_SUCCESS = '[TimeDailySignoff] ADD_SUCCESS';
    static UPDATE = '[TimeDailySignoff] UPDATE';
    static UPDATE_SUCCESS = '[TimeDailySignoff] UPDATE_SUCCESS';
    static PATCH = '[TimeDailySignoff] PATCH';
    static PATCH_SUCCESS = '[TimeDailySignoff] PATCH_SUCCESS';
    static REMOVE = '[TimeDailySignoff] REMOVE';
    static REMOVE_SUCCESS = '[TimeDailySignoff] REMOVE_SUCCESS';

    LoadAll(payload: IActionWithHTTPData): IActionWithPayload {
        return { type: TimeDailySignoffActions.LOAD_ALL, payload };
    }

    LoadAllSuccess(payload: ITimeDailySignoff[]): IActionWithPayload {
        return { type: TimeDailySignoffActions.LOAD_ALL_SUCCESS, payload };
    }

    LoadOne(payload: number): IActionWithPayload {
        return { type: TimeDailySignoffActions.LOAD_ONE, payload };
    }

    LoadOneSuccess(payload: ITimeDailySignoff): IActionWithPayload {
        return { type: TimeDailySignoffActions.LOAD_ONE_SUCCESS, payload };
    }

    Add(payload: ITimeDailySignoff): IActionWithPayload {
        return { type: TimeDailySignoffActions.ADD, payload };
    }

    AddSuccess(payload: ITimeDailySignoff): IActionWithPayload {
        return { type: TimeDailySignoffActions.ADD_SUCCESS, payload };
    }

    Update(payload: ITimeDailySignoff): IActionWithPayload {
        return { type: TimeDailySignoffActions.UPDATE, payload };
    }

    UpdateSuccess(payload: ITimeDailySignoff): IActionWithPayload {
        return { type: TimeDailySignoffActions.UPDATE_SUCCESS, payload };
    }

    Patch(payload: ITimeDailySignoff): IActionWithPayload {
        return { type: TimeDailySignoffActions.PATCH, payload };
    }

    PatchSuccess(payload: ITimeDailySignoff): IActionWithPayload {
        return { type: TimeDailySignoffActions.PATCH_SUCCESS, payload };
    }

    Remove(payload: ITimeDailySignoff): IActionWithPayload {
        return { type: TimeDailySignoffActions.REMOVE, payload };
    }

    RemoveSuccess(payload: ITimeDailySignoff): IActionWithPayload {
        return { type: TimeDailySignoffActions.REMOVE_SUCCESS, payload };
    }
}
