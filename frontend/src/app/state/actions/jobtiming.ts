import { Action } from '@ngrx/store';
import { IActionWithHTTPData, IActionWithPayload } from '../models';
import { IJobTiming } from '../reducers/jobtiming';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class JobTimingActions {

    static LOAD_ALL = '[JobTiming] LOAD_ALL';
    static LOAD_ALL_SUCCESS = '[JobTiming] LOAD_ALL_SUCCESS';
    static LOAD_ONE = '[JobTiming] LOAD_ONE';
    static LOAD_ONE_SUCCESS = '[JobTiming] LOAD_ONE_SUCCESS';
    static ADD = '[JobTiming] ADD';
    static ADD_SUCCESS = '[JobTiming] ADD_SUCCESS';
    static UPDATE = '[JobTiming] UPDATE';
    static UPDATE_SUCCESS = '[JobTiming] UPDATE_SUCCESS';
    static PATCH = '[JobTiming] PATCH';
    static PATCH_SUCCESS = '[JobTiming] PATCH_SUCCESS';
    static REMOVE = '[JobTiming] REMOVE';
    static REMOVE_SUCCESS = '[JobTiming] REMOVE_SUCCESS';
    static REPLACE_MANY = '[JobTiming] REPLACE_MANY';

    LoadAll(): Action {
        return { type: JobTimingActions.LOAD_ALL };
    }

    LoadAllSuccess(payload: IJobTiming[]): IActionWithPayload {
        return { type: JobTimingActions.LOAD_ALL_SUCCESS, payload };
    }

    LoadOne(payload: number): IActionWithPayload {
        return { type: JobTimingActions.LOAD_ONE, payload };
    }

    LoadOneSuccess(payload: IJobTiming): IActionWithPayload {
        return { type: JobTimingActions.LOAD_ONE_SUCCESS, payload };
    }

    Add(payload: IJobTiming): IActionWithPayload {
        return { type: JobTimingActions.ADD, payload };
    }

    AddSuccess(payload: IJobTiming): IActionWithPayload {
        return { type: JobTimingActions.ADD_SUCCESS, payload };
    }

    Update(payload: IJobTiming): IActionWithPayload {
        return { type: JobTimingActions.UPDATE, payload };
    }

    UpdateSuccess(payload: IJobTiming): IActionWithPayload {
        return { type: JobTimingActions.UPDATE_SUCCESS, payload };
    }

    Patch(payload: IJobTiming): IActionWithPayload {
        return { type: JobTimingActions.PATCH, payload };
    }

    PatchSuccess(payload: IJobTiming): IActionWithPayload {
        return { type: JobTimingActions.PATCH_SUCCESS, payload };
    }

    Remove(payload: IJobTiming): IActionWithPayload {
        return { type: JobTimingActions.REMOVE, payload };
    }

    RemoveSuccess(payload: IJobTiming): IActionWithPayload {
        return { type: JobTimingActions.REMOVE_SUCCESS, payload };
    }

    ReplaceMany(payload: IJobTiming[]): IActionWithPayload {
        return { type: JobTimingActions.REPLACE_MANY, payload };
    }
}
