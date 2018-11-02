import { Action } from '@ngrx/store';
import { IActionWithPayload } from '../models';
import { IJobType } from '../reducers/jobtype';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class JobTypeActions {

    static LOAD_ALL = '[JobType] LOAD_ALL';
    static LOAD_ALL_SUCCESS = '[JobType] LOAD_ALL_SUCCESS';
    static LOAD_ONE = '[JobType] LOAD_ONE';
    static LOAD_ONE_SUCCESS = '[JobType] LOAD_ONE_SUCCESS';
    static ADD = '[JobType] ADD';
    static ADD_SUCCESS = '[JobType] ADD_SUCCESS';
    static UPDATE = '[JobType] UPDATE';
    static UPDATE_SUCCESS = '[JobType] UPDATE_SUCCESS';
    static REMOVE = '[JobType] REMOVE';
    static REMOVE_SUCCESS = '[JobType] REMOVE_SUCCESS';

    LoadAll(): Action {
        return { type: JobTypeActions.LOAD_ALL };
    }

    LoadAllSuccess(payload: IJobType[]): IActionWithPayload {
        return { type: JobTypeActions.LOAD_ALL_SUCCESS, payload };
    }

    LoadOne(payload: number): IActionWithPayload {
        return { type: JobTypeActions.LOAD_ONE, payload };
    }

    LoadOneSuccess(payload: IJobType): IActionWithPayload {
        return { type: JobTypeActions.LOAD_ONE_SUCCESS, payload };
    }

    Add(payload: IJobType): IActionWithPayload {
        return { type: JobTypeActions.ADD, payload };
    }

    AddSuccess(payload: IJobType): IActionWithPayload {
        return { type: JobTypeActions.ADD_SUCCESS, payload };
    }

    Update(payload: IJobType): IActionWithPayload {
        return { type: JobTypeActions.UPDATE, payload };
    }

    UpdateSuccess(payload: IJobType): IActionWithPayload {
        return { type: JobTypeActions.UPDATE_SUCCESS, payload };
    }

    Remove(payload: IJobType): IActionWithPayload {
        return { type: JobTypeActions.REMOVE, payload };
    }

    RemoveSuccess(payload: IJobType): IActionWithPayload {
        return { type: JobTypeActions.REMOVE_SUCCESS, payload };
    }
}
