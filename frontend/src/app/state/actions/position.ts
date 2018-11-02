import { Action } from '@ngrx/store';
import { IActionWithPayload } from '../models';
import { IPosition } from '../reducers/position';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PositionActions {

    static LOAD_ALL = '[Position] LOAD_ALL';
    static LOAD_ALL_SUCCESS = '[Position] LOAD_ALL_SUCCESS';
    static LOAD_ONE = '[Position] LOAD_ONE';
    static LOAD_ONE_SUCCESS = '[Position] LOAD_ONE_SUCCESS';
    static ADD = '[Position] ADD';
    static ADD_SUCCESS = '[Position] ADD_SUCCESS';
    static UPDATE = '[Position] UPDATE';
    static UPDATE_SUCCESS = '[Position] UPDATE_SUCCESS';
    static REMOVE = '[Position] REMOVE';
    static REMOVE_SUCCESS = '[Position] REMOVE_SUCCESS';

    LoadAll(): Action {
        return { type: PositionActions.LOAD_ALL };
    }

    LoadAllSuccess(payload: IPosition[]): IActionWithPayload {
        return { type: PositionActions.LOAD_ALL_SUCCESS, payload };
    }

    LoadOne(payload: number): IActionWithPayload {
        return { type: PositionActions.LOAD_ONE, payload };
    }

    LoadOneSuccess(payload: IPosition): IActionWithPayload {
        return { type: PositionActions.LOAD_ONE_SUCCESS, payload };
    }

    Add(payload: IPosition): IActionWithPayload {
        return { type: PositionActions.ADD, payload };
    }

    AddSuccess(payload: IPosition): IActionWithPayload {
        return { type: PositionActions.ADD_SUCCESS, payload };
    }

    Update(payload: IPosition): IActionWithPayload {
        return { type: PositionActions.UPDATE, payload };
    }

    UpdateSuccess(payload: IPosition): IActionWithPayload {
        return { type: PositionActions.UPDATE_SUCCESS, payload };
    }

    Remove(payload: IPosition): IActionWithPayload {
        return { type: PositionActions.REMOVE, payload };
    }

    RemoveSuccess(payload: IPosition): IActionWithPayload {
        return { type: PositionActions.REMOVE_SUCCESS, payload };
    }
}
