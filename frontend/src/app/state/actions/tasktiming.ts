import { IActionWithHTTPData, IActionWithPayload } from '../models';
import { Injectable } from '@angular/core';
import { ITaskTiming } from '../reducers/tasktiming';

@Injectable({
    providedIn: 'root'
})
export class TaskTimingActions {

    static LOAD_ALL = '[TaskTiming] LOAD_ALL';
    static LOAD_ALL_SUCCESS = '[TaskTiming] LOAD_ALL_SUCCESS';
    static LOAD_ONE = '[TaskTiming] LOAD_ONE';
    static LOAD_ONE_SUCCESS = '[TaskTiming] LOAD_ONE_SUCCESS';
    static ADD = '[TaskTiming] ADD';
    static ADD_SUCCESS = '[TaskTiming] ADD_SUCCESS';
    static UPDATE = '[TaskTiming] UPDATE';
    static UPDATE_SUCCESS = '[TaskTiming] UPDATE_SUCCESS';
    static PATCH = '[TaskTiming] PATCH';
    static PATCH_SUCCESS = '[TaskTiming] PATCH_SUCCESS';
    static REMOVE = '[TaskTiming] REMOVE';
    static REMOVE_SUCCESS = '[TaskTiming] REMOVE_SUCCESS';
    static REPLACE_MANY = '[TaskTiming] REPLACE_MANY';

    LoadAll(payload: IActionWithHTTPData): IActionWithPayload {
        return { type: TaskTimingActions.LOAD_ALL, payload };
    }

    LoadAllSuccess(payload: ITaskTiming[]): IActionWithPayload {
        return { type: TaskTimingActions.LOAD_ALL_SUCCESS, payload };
    }

    LoadOne(payload: number): IActionWithPayload {
        return { type: TaskTimingActions.LOAD_ONE, payload };
    }

    LoadOneSuccess(payload: ITaskTiming): IActionWithPayload {
        return { type: TaskTimingActions.LOAD_ONE_SUCCESS, payload };
    }

    Add(payload: ITaskTiming): IActionWithPayload {
        return { type: TaskTimingActions.ADD, payload };
    }

    AddSuccess(payload: ITaskTiming): IActionWithPayload {
        return { type: TaskTimingActions.ADD_SUCCESS, payload };
    }

    Update(payload: ITaskTiming): IActionWithPayload {
        return { type: TaskTimingActions.UPDATE, payload };
    }

    UpdateSuccess(payload: ITaskTiming): IActionWithPayload {
        return { type: TaskTimingActions.UPDATE_SUCCESS, payload };
    }

    Patch(payload: ITaskTiming): IActionWithPayload {
        return { type: TaskTimingActions.PATCH, payload };
    }

    PatchSuccess(payload: ITaskTiming): IActionWithPayload {
        return { type: TaskTimingActions.PATCH_SUCCESS, payload };
    }

    Remove(payload: ITaskTiming): IActionWithPayload {
        return { type: TaskTimingActions.REMOVE, payload };
    }

    RemoveSuccess(payload: ITaskTiming): IActionWithPayload {
        return { type: TaskTimingActions.REMOVE_SUCCESS, payload };
    }

    ReplaceMany(payload: ITaskTiming[]): IActionWithPayload {
        return { type: TaskTimingActions.REPLACE_MANY, payload };
    }
}
