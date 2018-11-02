import { Action } from '@ngrx/store';
import { IActionWithPayload } from '../models';
import { IJobFile } from '../reducers/jobfile';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class JobFileActions {

    static LOAD_ALL = '[JobFile] LOAD_ALL';
    static LOAD_ALL_SUCCESS = '[JobFile] LOAD_ALL_SUCCESS';
    static LOAD_ONE = '[JobFile] LOAD_ONE';
    static LOAD_ONE_SUCCESS = '[JobFile] LOAD_ONE_SUCCESS';
    static ADD = '[JobFile] ADD';
    static ADD_SUCCESS = '[JobFile] ADD_SUCCESS';
    static UPDATE = '[JobFile] UPDATE';
    static UPDATE_SUCCESS = '[JobFile] UPDATE_SUCCESS';
    static REMOVE = '[JobFile] REMOVE';
    static REMOVE_SUCCESS = '[JobFile] REMOVE_SUCCESS';

    LoadAll(): Action {
        return { type: JobFileActions.LOAD_ALL };
    }

    LoadAllSuccess(payload: IJobFile[]): IActionWithPayload {
        return { type: JobFileActions.LOAD_ALL_SUCCESS, payload };
    }

    LoadOne(payload: number): IActionWithPayload {
        return { type: JobFileActions.LOAD_ONE, payload };
    }

    LoadOneSuccess(payload: IJobFile): IActionWithPayload {
        return { type: JobFileActions.LOAD_ONE_SUCCESS, payload };
    }

    Add(payload: IJobFile): IActionWithPayload {
        return { type: JobFileActions.ADD, payload };
    }

    AddSuccess(payload: IJobFile): IActionWithPayload {
        return { type: JobFileActions.ADD_SUCCESS, payload };
    }

    Update(payload: IJobFile): IActionWithPayload {
        return { type: JobFileActions.UPDATE, payload };
    }

    UpdateSuccess(payload: IJobFile): IActionWithPayload {
        return { type: JobFileActions.UPDATE_SUCCESS, payload };
    }

    Remove(payload: IJobFile): IActionWithPayload {
        return { type: JobFileActions.REMOVE, payload };
    }

    RemoveSuccess(payload: IJobFile): IActionWithPayload {
        return { type: JobFileActions.REMOVE_SUCCESS, payload };
    }
}
