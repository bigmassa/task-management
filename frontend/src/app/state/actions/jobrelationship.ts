import { Action } from '@ngrx/store';
import { IActionWithPayload } from '../models';
import { IJobRelationship } from '../reducers/jobrelationship';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class JobRelationshipActions {

    static LOAD_ALL = '[JobRelationship] LOAD_ALL';
    static LOAD_ALL_SUCCESS = '[JobRelationship] LOAD_ALL_SUCCESS';
    static LOAD_ONE = '[JobRelationship] LOAD_ONE';
    static LOAD_ONE_SUCCESS = '[JobRelationship] LOAD_ONE_SUCCESS';
    static ADD = '[JobRelationship] ADD';
    static ADD_SUCCESS = '[JobRelationship] ADD_SUCCESS';
    static UPDATE = '[JobRelationship] UPDATE';
    static UPDATE_SUCCESS = '[JobRelationship] UPDATE_SUCCESS';
    static PATCH = '[JobRelationship] PATCH';
    static PATCH_SUCCESS = '[JobRelationship] PATCH_SUCCESS';
    static REMOVE = '[JobRelationship] REMOVE';
    static REMOVE_SUCCESS = '[JobRelationship] REMOVE_SUCCESS';

    LoadAll(): Action {
        return { type: JobRelationshipActions.LOAD_ALL };
    }

    LoadAllSuccess(payload: IJobRelationship[]): IActionWithPayload {
        return { type: JobRelationshipActions.LOAD_ALL_SUCCESS, payload };
    }

    LoadOne(payload: number): IActionWithPayload {
        return { type: JobRelationshipActions.LOAD_ONE, payload };
    }

    LoadOneSuccess(payload: IJobRelationship): IActionWithPayload {
        return { type: JobRelationshipActions.LOAD_ONE_SUCCESS, payload };
    }

    Add(payload: IJobRelationship): IActionWithPayload {
        return { type: JobRelationshipActions.ADD, payload };
    }

    AddSuccess(payload: IJobRelationship): IActionWithPayload {
        return { type: JobRelationshipActions.ADD_SUCCESS, payload };
    }

    Update(payload: IJobRelationship): IActionWithPayload {
        return { type: JobRelationshipActions.UPDATE, payload };
    }

    UpdateSuccess(payload: IJobRelationship): IActionWithPayload {
        return { type: JobRelationshipActions.UPDATE_SUCCESS, payload };
    }

    Patch(payload: IJobRelationship): IActionWithPayload {
        return { type: JobRelationshipActions.PATCH, payload };
    }

    PatchSuccess(payload: IJobRelationship): IActionWithPayload {
        return { type: JobRelationshipActions.PATCH_SUCCESS, payload };
    }

    Remove(payload: IJobRelationship): IActionWithPayload {
        return { type: JobRelationshipActions.REMOVE, payload };
    }

    RemoveSuccess(payload: IJobRelationship): IActionWithPayload {
        return { type: JobRelationshipActions.REMOVE_SUCCESS, payload };
    }
}
