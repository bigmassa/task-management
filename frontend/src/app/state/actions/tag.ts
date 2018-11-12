import { Action } from '@ngrx/store';
import { IActionWithPayload } from '../models';
import { ITag } from '../reducers/tag';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TagActions {

    static LOAD_ALL = '[Tag] LOAD_ALL';
    static LOAD_ALL_SUCCESS = '[Tag] LOAD_ALL_SUCCESS';
    static LOAD_ONE = '[Tag] LOAD_ONE';
    static LOAD_ONE_SUCCESS = '[Tag] LOAD_ONE_SUCCESS';
    static ADD = '[Tag] ADD';
    static ADD_SUCCESS = '[Tag] ADD_SUCCESS';
    static UPDATE = '[Tag] UPDATE';
    static UPDATE_SUCCESS = '[Tag] UPDATE_SUCCESS';
    static REMOVE = '[Tag] REMOVE';
    static REMOVE_SUCCESS = '[Tag] REMOVE_SUCCESS';

    LoadAll(): Action {
        return { type: TagActions.LOAD_ALL };
    }

    LoadAllSuccess(payload: ITag[]): IActionWithPayload {
        return { type: TagActions.LOAD_ALL_SUCCESS, payload };
    }

    LoadOne(payload: number): IActionWithPayload {
        return { type: TagActions.LOAD_ONE, payload };
    }

    LoadOneSuccess(payload: ITag): IActionWithPayload {
        return { type: TagActions.LOAD_ONE_SUCCESS, payload };
    }

    Add(payload: ITag): IActionWithPayload {
        return { type: TagActions.ADD, payload };
    }

    AddSuccess(payload: ITag): IActionWithPayload {
        return { type: TagActions.ADD_SUCCESS, payload };
    }

    Update(payload: ITag): IActionWithPayload {
        return { type: TagActions.UPDATE, payload };
    }

    UpdateSuccess(payload: ITag): IActionWithPayload {
        return { type: TagActions.UPDATE_SUCCESS, payload };
    }

    Remove(payload: ITag): IActionWithPayload {
        return { type: TagActions.REMOVE, payload };
    }

    RemoveSuccess(payload: ITag): IActionWithPayload {
        return { type: TagActions.REMOVE_SUCCESS, payload };
    }
}
