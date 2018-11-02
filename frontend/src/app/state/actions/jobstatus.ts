import { Action } from '@ngrx/store';
import { IActionWithPayload } from '../models';
import { IJobStatus } from '../reducers/jobstatus';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class JobStatusActions {

    static LOAD_ALL = '[JobStatus] LOAD_ALL';
    static LOAD_ALL_SUCCESS = '[JobStatus] LOAD_ALL_SUCCESS';
    static LOAD_ONE = '[JobStatus] LOAD_ONE';
    static LOAD_ONE_SUCCESS = '[JobStatus] LOAD_ONE_SUCCESS';
    static ADD = '[JobStatus] ADD';
    static ADD_SUCCESS = '[JobStatus] ADD_SUCCESS';
    static UPDATE = '[JobStatus] UPDATE';
    static UPDATE_SUCCESS = '[JobStatus] UPDATE_SUCCESS';
    static REMOVE = '[JobStatus] REMOVE';
    static REMOVE_SUCCESS = '[JobStatus] REMOVE_SUCCESS';

    LoadAll(): Action {
        return { type: JobStatusActions.LOAD_ALL };
    }

    LoadAllSuccess(payload: IJobStatus[]): IActionWithPayload {
        return { type: JobStatusActions.LOAD_ALL_SUCCESS, payload };
    }

    LoadOne(payload: number): IActionWithPayload {
        return { type: JobStatusActions.LOAD_ONE, payload };
    }

    LoadOneSuccess(payload: IJobStatus): IActionWithPayload {
        return { type: JobStatusActions.LOAD_ONE_SUCCESS, payload };
    }

    Add(payload: IJobStatus): IActionWithPayload {
        return { type: JobStatusActions.ADD, payload };
    }

    AddSuccess(payload: IJobStatus): IActionWithPayload {
        return { type: JobStatusActions.ADD_SUCCESS, payload };
    }

    Update(payload: IJobStatus): IActionWithPayload {
        return { type: JobStatusActions.UPDATE, payload };
    }

    UpdateSuccess(payload: IJobStatus): IActionWithPayload {
        return { type: JobStatusActions.UPDATE_SUCCESS, payload };
    }

    Remove(payload: IJobStatus): IActionWithPayload {
        return { type: JobStatusActions.REMOVE, payload };
    }

    RemoveSuccess(payload: IJobStatus): IActionWithPayload {
        return { type: JobStatusActions.REMOVE_SUCCESS, payload };
    }
}
