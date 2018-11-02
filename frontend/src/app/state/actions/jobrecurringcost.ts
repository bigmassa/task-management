import { Action } from '@ngrx/store';
import { IActionWithPayload } from '../models';
import { IJobRecurringCost } from '../reducers/jobrecurringcost';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class JobRecurringCostActions {

    static LOAD_ALL = '[JobRecurringCost] LOAD_ALL';
    static LOAD_ALL_SUCCESS = '[JobRecurringCost] LOAD_ALL_SUCCESS';
    static LOAD_ONE = '[JobRecurringCost] LOAD_ONE';
    static LOAD_ONE_SUCCESS = '[JobRecurringCost] LOAD_ONE_SUCCESS';
    static ADD = '[JobRecurringCost] ADD';
    static ADD_SUCCESS = '[JobRecurringCost] ADD_SUCCESS';
    static UPDATE = '[JobRecurringCost] UPDATE';
    static UPDATE_SUCCESS = '[JobRecurringCost] UPDATE_SUCCESS';
    static PATCH = '[JobRecurringCost] PATCH';
    static PATCH_SUCCESS = '[JobRecurringCost] PATCH_SUCCESS';
    static REMOVE = '[JobRecurringCost] REMOVE';
    static REMOVE_SUCCESS = '[JobRecurringCost] REMOVE_SUCCESS';

    LoadAll(): Action {
        return { type: JobRecurringCostActions.LOAD_ALL };
    }

    LoadAllSuccess(payload: IJobRecurringCost[]): IActionWithPayload {
        return { type: JobRecurringCostActions.LOAD_ALL_SUCCESS, payload };
    }

    LoadOne(payload: number): IActionWithPayload {
        return { type: JobRecurringCostActions.LOAD_ONE, payload };
    }

    LoadOneSuccess(payload: IJobRecurringCost): IActionWithPayload {
        return { type: JobRecurringCostActions.LOAD_ONE_SUCCESS, payload };
    }

    Add(payload: IJobRecurringCost): IActionWithPayload {
        return { type: JobRecurringCostActions.ADD, payload };
    }

    AddSuccess(payload: IJobRecurringCost): IActionWithPayload {
        return { type: JobRecurringCostActions.ADD_SUCCESS, payload };
    }

    Update(payload: IJobRecurringCost): IActionWithPayload {
        return { type: JobRecurringCostActions.UPDATE, payload };
    }

    UpdateSuccess(payload: IJobRecurringCost): IActionWithPayload {
        return { type: JobRecurringCostActions.UPDATE_SUCCESS, payload };
    }

    Patch(payload: IJobRecurringCost): IActionWithPayload {
        return { type: JobRecurringCostActions.PATCH, payload };
    }

    PatchSuccess(payload: IJobRecurringCost): IActionWithPayload {
        return { type: JobRecurringCostActions.PATCH_SUCCESS, payload };
    }

    Remove(payload: IJobRecurringCost): IActionWithPayload {
        return { type: JobRecurringCostActions.REMOVE, payload };
    }

    RemoveSuccess(payload: IJobRecurringCost): IActionWithPayload {
        return { type: JobRecurringCostActions.REMOVE_SUCCESS, payload };
    }
}
