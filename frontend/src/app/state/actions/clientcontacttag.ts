import { Action } from '@ngrx/store';
import { IActionWithPayload } from '../models';
import { IClientContactTag } from '../reducers/clientcontacttag';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ClientContactTagActions {

    static LOAD_ALL = '[ClientContactTag] LOAD_ALL';
    static LOAD_ALL_SUCCESS = '[ClientContactTag] LOAD_ALL_SUCCESS';
    static LOAD_ONE = '[ClientContactTag] LOAD_ONE';
    static LOAD_ONE_SUCCESS = '[ClientContactTag] LOAD_ONE_SUCCESS';
    static ADD = '[ClientContactTag] ADD';
    static ADD_SUCCESS = '[ClientContactTag] ADD_SUCCESS';
    static UPDATE = '[ClientContactTag] UPDATE';
    static UPDATE_SUCCESS = '[ClientContactTag] UPDATE_SUCCESS';
    static PATCH = '[ClientContactTag] PATCH';
    static PATCH_SUCCESS = '[ClientContactTag] PATCH_SUCCESS';
    static REMOVE = '[ClientContactTag] REMOVE';
    static REMOVE_SUCCESS = '[ClientContactTag] REMOVE_SUCCESS';

    LoadAll(): Action {
        return { type: ClientContactTagActions.LOAD_ALL };
    }

    LoadAllSuccess(payload: IClientContactTag[]): IActionWithPayload {
        return { type: ClientContactTagActions.LOAD_ALL_SUCCESS, payload };
    }

    LoadOne(payload: number): IActionWithPayload {
        return { type: ClientContactTagActions.LOAD_ONE, payload };
    }

    LoadOneSuccess(payload: IClientContactTag): IActionWithPayload {
        return { type: ClientContactTagActions.LOAD_ONE_SUCCESS, payload };
    }

    Add(payload: IClientContactTag): IActionWithPayload {
        return { type: ClientContactTagActions.ADD, payload };
    }

    AddSuccess(payload: IClientContactTag): IActionWithPayload {
        return { type: ClientContactTagActions.ADD_SUCCESS, payload };
    }

    Update(payload: IClientContactTag): IActionWithPayload {
        return { type: ClientContactTagActions.UPDATE, payload };
    }

    UpdateSuccess(payload: IClientContactTag): IActionWithPayload {
        return { type: ClientContactTagActions.UPDATE_SUCCESS, payload };
    }

    Patch(payload: IClientContactTag): IActionWithPayload {
        return { type: ClientContactTagActions.PATCH, payload };
    }

    PatchSuccess(payload: IClientContactTag): IActionWithPayload {
        return { type: ClientContactTagActions.PATCH_SUCCESS, payload };
    }

    Remove(payload: IClientContactTag): IActionWithPayload {
        return { type: ClientContactTagActions.REMOVE, payload };
    }

    RemoveSuccess(payload: IClientContactTag): IActionWithPayload {
        return { type: ClientContactTagActions.REMOVE_SUCCESS, payload };
    }
}
