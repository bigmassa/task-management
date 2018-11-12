import { Action } from '@ngrx/store';
import { IActionWithPayload } from '../models';
import { ITaskTag } from '../reducers/tasktag';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TaskTagActions {

    static LOAD_ALL = '[TaskTag] LOAD_ALL';
    static LOAD_ALL_SUCCESS = '[TaskTag] LOAD_ALL_SUCCESS';
    static LOAD_ONE = '[TaskTag] LOAD_ONE';
    static LOAD_ONE_SUCCESS = '[TaskTag] LOAD_ONE_SUCCESS';
    static ADD = '[TaskTag] ADD';
    static ADD_SUCCESS = '[TaskTag] ADD_SUCCESS';
    static UPDATE = '[TaskTag] UPDATE';
    static UPDATE_SUCCESS = '[TaskTag] UPDATE_SUCCESS';
    static PATCH = '[TaskTag] PATCH';
    static PATCH_SUCCESS = '[TaskTag] PATCH_SUCCESS';
    static REMOVE = '[TaskTag] REMOVE';
    static REMOVE_SUCCESS = '[TaskTag] REMOVE_SUCCESS';

    LoadAll(): Action {
        return { type: TaskTagActions.LOAD_ALL };
    }

    LoadAllSuccess(payload: ITaskTag[]): IActionWithPayload {
        return { type: TaskTagActions.LOAD_ALL_SUCCESS, payload };
    }

    LoadOne(payload: number): IActionWithPayload {
        return { type: TaskTagActions.LOAD_ONE, payload };
    }

    LoadOneSuccess(payload: ITaskTag): IActionWithPayload {
        return { type: TaskTagActions.LOAD_ONE_SUCCESS, payload };
    }

    Add(payload: ITaskTag): IActionWithPayload {
        return { type: TaskTagActions.ADD, payload };
    }

    AddSuccess(payload: ITaskTag): IActionWithPayload {
        return { type: TaskTagActions.ADD_SUCCESS, payload };
    }

    Update(payload: ITaskTag): IActionWithPayload {
        return { type: TaskTagActions.UPDATE, payload };
    }

    UpdateSuccess(payload: ITaskTag): IActionWithPayload {
        return { type: TaskTagActions.UPDATE_SUCCESS, payload };
    }

    Patch(payload: ITaskTag): IActionWithPayload {
        return { type: TaskTagActions.PATCH, payload };
    }

    PatchSuccess(payload: ITaskTag): IActionWithPayload {
        return { type: TaskTagActions.PATCH_SUCCESS, payload };
    }

    Remove(payload: ITaskTag): IActionWithPayload {
        return { type: TaskTagActions.REMOVE, payload };
    }

    RemoveSuccess(payload: ITaskTag): IActionWithPayload {
        return { type: TaskTagActions.REMOVE_SUCCESS, payload };
    }
}
