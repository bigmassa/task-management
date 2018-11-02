import { Action } from '@ngrx/store';
import { IActionWithPayload } from '../models';
import { IRecurringCostType } from '../reducers/recurringcosttype';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RecurringCostTypeActions {

    static LOAD_ALL = '[RecurringCostType] LOAD_ALL';
    static LOAD_ALL_SUCCESS = '[RecurringCostType] LOAD_ALL_SUCCESS';
    static LOAD_ONE = '[RecurringCostType] LOAD_ONE';
    static LOAD_ONE_SUCCESS = '[RecurringCostType] LOAD_ONE_SUCCESS';
    static ADD = '[RecurringCostType] ADD';
    static ADD_SUCCESS = '[RecurringCostType] ADD_SUCCESS';
    static UPDATE = '[RecurringCostType] UPDATE';
    static UPDATE_SUCCESS = '[RecurringCostType] UPDATE_SUCCESS';
    static REMOVE = '[RecurringCostType] REMOVE';
    static REMOVE_SUCCESS = '[RecurringCostType] REMOVE_SUCCESS';

    LoadAll(): Action {
        return { type: RecurringCostTypeActions.LOAD_ALL };
    }

    LoadAllSuccess(payload: IRecurringCostType[]): IActionWithPayload {
        return { type: RecurringCostTypeActions.LOAD_ALL_SUCCESS, payload };
    }

    LoadOne(payload: number): IActionWithPayload {
        return { type: RecurringCostTypeActions.LOAD_ONE, payload };
    }

    LoadOneSuccess(payload: IRecurringCostType): IActionWithPayload {
        return { type: RecurringCostTypeActions.LOAD_ONE_SUCCESS, payload };
    }

    Add(payload: IRecurringCostType): IActionWithPayload {
        return { type: RecurringCostTypeActions.ADD, payload };
    }

    AddSuccess(payload: IRecurringCostType): IActionWithPayload {
        return { type: RecurringCostTypeActions.ADD_SUCCESS, payload };
    }

    Update(payload: IRecurringCostType): IActionWithPayload {
        return { type: RecurringCostTypeActions.UPDATE, payload };
    }

    UpdateSuccess(payload: IRecurringCostType): IActionWithPayload {
        return { type: RecurringCostTypeActions.UPDATE_SUCCESS, payload };
    }

    Remove(payload: IRecurringCostType): IActionWithPayload {
        return { type: RecurringCostTypeActions.REMOVE, payload };
    }

    RemoveSuccess(payload: IRecurringCostType): IActionWithPayload {
        return { type: RecurringCostTypeActions.REMOVE_SUCCESS, payload };
    }
}
