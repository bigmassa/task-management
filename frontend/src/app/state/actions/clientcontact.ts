import { Action } from '@ngrx/store';
import { IActionWithPayload } from '../models';
import { IClientContact } from '../reducers/clientcontact';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ClientContactActions {

    static LOAD_ALL = '[ClientContact] LOAD_ALL';
    static LOAD_ALL_SUCCESS = '[ClientContact] LOAD_ALL_SUCCESS';
    static LOAD_ONE = '[ClientContact] LOAD_ONE';
    static LOAD_ONE_SUCCESS = '[ClientContact] LOAD_ONE_SUCCESS';
    static ADD = '[ClientContact] ADD';
    static ADD_SUCCESS = '[ClientContact] ADD_SUCCESS';
    static UPDATE = '[ClientContact] UPDATE';
    static UPDATE_SUCCESS = '[ClientContact] UPDATE_SUCCESS';
    static PATCH = '[ClientContact] PATCH';
    static PATCH_SUCCESS = '[ClientContact] PATCH_SUCCESS';
    static REMOVE = '[ClientContact] REMOVE';
    static REMOVE_SUCCESS = '[ClientContact] REMOVE_SUCCESS';

    LoadAll(): Action {
        return { type: ClientContactActions.LOAD_ALL };
    }

    LoadAllSuccess(payload: IClientContact[]): IActionWithPayload {
        return { type: ClientContactActions.LOAD_ALL_SUCCESS, payload };
    }

    LoadOne(payload: number): IActionWithPayload {
        return { type: ClientContactActions.LOAD_ONE, payload };
    }

    LoadOneSuccess(payload: IClientContact): IActionWithPayload {
        return { type: ClientContactActions.LOAD_ONE_SUCCESS, payload };
    }

    Add(payload: IClientContact): IActionWithPayload {
        return { type: ClientContactActions.ADD, payload };
    }

    AddSuccess(payload: IClientContact): IActionWithPayload {
        return { type: ClientContactActions.ADD_SUCCESS, payload };
    }

    Update(payload: IClientContact): IActionWithPayload {
        return { type: ClientContactActions.UPDATE, payload };
    }

    UpdateSuccess(payload: IClientContact): IActionWithPayload {
        return { type: ClientContactActions.UPDATE_SUCCESS, payload };
    }

    Patch(payload: IClientContact): IActionWithPayload {
        return { type: ClientContactActions.PATCH, payload };
    }

    PatchSuccess(payload: IClientContact): IActionWithPayload {
        return { type: ClientContactActions.PATCH_SUCCESS, payload };
    }

    Remove(payload: IClientContact): IActionWithPayload {
        return { type: ClientContactActions.REMOVE, payload };
    }

    RemoveSuccess(payload: IClientContact): IActionWithPayload {
        return { type: ClientContactActions.REMOVE_SUCCESS, payload };
    }
}
