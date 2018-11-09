import { Action } from '@ngrx/store';
import { IActionWithPayload } from '../models';
import { ITaskFile } from '../reducers/taskfile';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TaskFileActions {

    static LOAD_ALL = '[TaskFile] LOAD_ALL';
    static LOAD_ALL_SUCCESS = '[TaskFile] LOAD_ALL_SUCCESS';
    static LOAD_ONE = '[TaskFile] LOAD_ONE';
    static LOAD_ONE_SUCCESS = '[TaskFile] LOAD_ONE_SUCCESS';
    static ADD = '[TaskFile] ADD';
    static ADD_SUCCESS = '[TaskFile] ADD_SUCCESS';
    static UPDATE = '[TaskFile] UPDATE';
    static UPDATE_SUCCESS = '[TaskFile] UPDATE_SUCCESS';
    static REMOVE = '[TaskFile] REMOVE';
    static REMOVE_SUCCESS = '[TaskFile] REMOVE_SUCCESS';

    LoadAll(): Action {
        return { type: TaskFileActions.LOAD_ALL };
    }

    LoadAllSuccess(payload: ITaskFile[]): IActionWithPayload {
        return { type: TaskFileActions.LOAD_ALL_SUCCESS, payload };
    }

    LoadOne(payload: number): IActionWithPayload {
        return { type: TaskFileActions.LOAD_ONE, payload };
    }

    LoadOneSuccess(payload: ITaskFile): IActionWithPayload {
        return { type: TaskFileActions.LOAD_ONE_SUCCESS, payload };
    }

    Add(payload: ITaskFile): IActionWithPayload {
        return { type: TaskFileActions.ADD, payload };
    }

    AddSuccess(payload: ITaskFile): IActionWithPayload {
        return { type: TaskFileActions.ADD_SUCCESS, payload };
    }

    Update(payload: ITaskFile): IActionWithPayload {
        return { type: TaskFileActions.UPDATE, payload };
    }

    UpdateSuccess(payload: ITaskFile): IActionWithPayload {
        return { type: TaskFileActions.UPDATE_SUCCESS, payload };
    }

    Remove(payload: ITaskFile): IActionWithPayload {
        return { type: TaskFileActions.REMOVE, payload };
    }

    RemoveSuccess(payload: ITaskFile): IActionWithPayload {
        return { type: TaskFileActions.REMOVE_SUCCESS, payload };
    }
}
