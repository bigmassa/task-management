import { Action } from '@ngrx/store';
import { IActionWithPayload } from '../models';
import { IPaymentOption } from '../reducers/paymentoption';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PaymentOptionActions {

    static LOAD_ALL = '[PaymentOption] LOAD_ALL';
    static LOAD_ALL_SUCCESS = '[PaymentOption] LOAD_ALL_SUCCESS';
    static LOAD_ONE = '[PaymentOption] LOAD_ONE';
    static LOAD_ONE_SUCCESS = '[PaymentOption] LOAD_ONE_SUCCESS';
    static ADD = '[PaymentOption] ADD';
    static ADD_SUCCESS = '[PaymentOption] ADD_SUCCESS';
    static UPDATE = '[PaymentOption] UPDATE';
    static UPDATE_SUCCESS = '[PaymentOption] UPDATE_SUCCESS';
    static REMOVE = '[PaymentOption] REMOVE';
    static REMOVE_SUCCESS = '[PaymentOption] REMOVE_SUCCESS';

    LoadAll(): Action {
        return { type: PaymentOptionActions.LOAD_ALL };
    }

    LoadAllSuccess(payload: IPaymentOption[]): IActionWithPayload {
        return { type: PaymentOptionActions.LOAD_ALL_SUCCESS, payload };
    }

    LoadOne(payload: number): IActionWithPayload {
        return { type: PaymentOptionActions.LOAD_ONE, payload };
    }

    LoadOneSuccess(payload: IPaymentOption): IActionWithPayload {
        return { type: PaymentOptionActions.LOAD_ONE_SUCCESS, payload };
    }

    Add(payload: IPaymentOption): IActionWithPayload {
        return { type: PaymentOptionActions.ADD, payload };
    }

    AddSuccess(payload: IPaymentOption): IActionWithPayload {
        return { type: PaymentOptionActions.ADD_SUCCESS, payload };
    }

    Update(payload: IPaymentOption): IActionWithPayload {
        return { type: PaymentOptionActions.UPDATE, payload };
    }

    UpdateSuccess(payload: IPaymentOption): IActionWithPayload {
        return { type: PaymentOptionActions.UPDATE_SUCCESS, payload };
    }

    Remove(payload: IPaymentOption): IActionWithPayload {
        return { type: PaymentOptionActions.REMOVE, payload };
    }

    RemoveSuccess(payload: IPaymentOption): IActionWithPayload {
        return { type: PaymentOptionActions.REMOVE_SUCCESS, payload };
    }
}
