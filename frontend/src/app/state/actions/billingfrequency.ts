import { Action } from '@ngrx/store';
import { IActionWithPayload } from '../models';
import { IBillingFrequency } from '../reducers/billingfrequency';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BillingFrequencyActions {

    static LOAD_ALL = '[BillingFrequency] LOAD_ALL';
    static LOAD_ALL_SUCCESS = '[BillingFrequency] LOAD_ALL_SUCCESS';
    static LOAD_ONE = '[BillingFrequency] LOAD_ONE';
    static LOAD_ONE_SUCCESS = '[BillingFrequency] LOAD_ONE_SUCCESS';
    static ADD = '[BillingFrequency] ADD';
    static ADD_SUCCESS = '[BillingFrequency] ADD_SUCCESS';
    static UPDATE = '[BillingFrequency] UPDATE';
    static UPDATE_SUCCESS = '[BillingFrequency] UPDATE_SUCCESS';
    static REMOVE = '[BillingFrequency] REMOVE';
    static REMOVE_SUCCESS = '[BillingFrequency] REMOVE_SUCCESS';

    LoadAll(): Action {
        return { type: BillingFrequencyActions.LOAD_ALL };
    }

    LoadAllSuccess(payload: IBillingFrequency[]): IActionWithPayload {
        return { type: BillingFrequencyActions.LOAD_ALL_SUCCESS, payload };
    }

    LoadOne(payload: number): IActionWithPayload {
        return { type: BillingFrequencyActions.LOAD_ONE, payload };
    }

    LoadOneSuccess(payload: IBillingFrequency): IActionWithPayload {
        return { type: BillingFrequencyActions.LOAD_ONE_SUCCESS, payload };
    }

    Add(payload: IBillingFrequency): IActionWithPayload {
        return { type: BillingFrequencyActions.ADD, payload };
    }

    AddSuccess(payload: IBillingFrequency): IActionWithPayload {
        return { type: BillingFrequencyActions.ADD_SUCCESS, payload };
    }

    Update(payload: IBillingFrequency): IActionWithPayload {
        return { type: BillingFrequencyActions.UPDATE, payload };
    }

    UpdateSuccess(payload: IBillingFrequency): IActionWithPayload {
        return { type: BillingFrequencyActions.UPDATE_SUCCESS, payload };
    }

    Remove(payload: IBillingFrequency): IActionWithPayload {
        return { type: BillingFrequencyActions.REMOVE, payload };
    }

    RemoveSuccess(payload: IBillingFrequency): IActionWithPayload {
        return { type: BillingFrequencyActions.REMOVE_SUCCESS, payload };
    }
}
