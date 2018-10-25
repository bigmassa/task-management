import { Action } from '@ngrx/store';
import { IActionWithPayload } from '../models';
import { ITimeEntry } from '../reducers/timeentry';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TimeEntryActions {

    static LOAD_ALL = '[TimeEntry] LOAD_ALL';
    static LOAD_ALL_SUCCESS = '[TimeEntry] LOAD_ALL_SUCCESS';
    static LOAD_ONE = '[TimeEntry] LOAD_ONE';
    static LOAD_ONE_SUCCESS = '[TimeEntry] LOAD_ONE_SUCCESS';
    static ADD = '[TimeEntry] ADD';
    static ADD_SUCCESS = '[TimeEntry] ADD_SUCCESS';
    static UPDATE = '[TimeEntry] UPDATE';
    static UPDATE_SUCCESS = '[TimeEntry] UPDATE_SUCCESS';
    static PATCH = '[TimeEntry] PATCH';
    static PATCH_SUCCESS = '[TimeEntry] PATCH_SUCCESS';
    static REMOVE = '[TimeEntry] REMOVE';
    static REMOVE_SUCCESS = '[TimeEntry] REMOVE_SUCCESS';

    LoadAll(): Action {
        return { type: TimeEntryActions.LOAD_ALL };
    }

    LoadAllSuccess(payload: ITimeEntry[]): IActionWithPayload {
        return { type: TimeEntryActions.LOAD_ALL_SUCCESS, payload };
    }

    LoadOne(payload: number): IActionWithPayload {
        return { type: TimeEntryActions.LOAD_ONE, payload };
    }

    LoadOneSuccess(payload: ITimeEntry): IActionWithPayload {
        return { type: TimeEntryActions.LOAD_ONE_SUCCESS, payload };
    }

    Add(payload: ITimeEntry): IActionWithPayload {
        return { type: TimeEntryActions.ADD, payload };
    }

    AddSuccess(payload: ITimeEntry): IActionWithPayload {
        return { type: TimeEntryActions.ADD_SUCCESS, payload };
    }

    Update(payload: ITimeEntry): IActionWithPayload {
        return { type: TimeEntryActions.UPDATE, payload };
    }

    UpdateSuccess(payload: ITimeEntry): IActionWithPayload {
        return { type: TimeEntryActions.UPDATE_SUCCESS, payload };
    }

    Patch(payload: ITimeEntry): IActionWithPayload {
        return { type: TimeEntryActions.PATCH, payload };
    }

    PatchSuccess(payload: ITimeEntry): IActionWithPayload {
        return { type: TimeEntryActions.PATCH_SUCCESS, payload };
    }

    Remove(payload: ITimeEntry): IActionWithPayload {
        return { type: TimeEntryActions.REMOVE, payload };
    }

    RemoveSuccess(payload: ITimeEntry): IActionWithPayload {
        return { type: TimeEntryActions.REMOVE_SUCCESS, payload };
    }
}
