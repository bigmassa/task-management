import { Action } from '@ngrx/store';
import { IActionWithPayload } from '../models';
import { IJobNote } from '../reducers/jobnote';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class JobNoteActions {

    static LOAD_ALL = '[JobNote] LOAD_ALL';
    static LOAD_ALL_SUCCESS = '[JobNote] LOAD_ALL_SUCCESS';
    static LOAD_ONE = '[JobNote] LOAD_ONE';
    static LOAD_ONE_SUCCESS = '[JobNote] LOAD_ONE_SUCCESS';
    static ADD = '[JobNote] ADD';
    static ADD_SUCCESS = '[JobNote] ADD_SUCCESS';
    static UPDATE = '[JobNote] UPDATE';
    static UPDATE_SUCCESS = '[JobNote] UPDATE_SUCCESS';
    static REMOVE = '[JobNote] REMOVE';
    static REMOVE_SUCCESS = '[JobNote] REMOVE_SUCCESS';

    LoadAll(): Action {
        return { type: JobNoteActions.LOAD_ALL };
    }

    LoadAllSuccess(payload: IJobNote[]): IActionWithPayload {
        return { type: JobNoteActions.LOAD_ALL_SUCCESS, payload };
    }

    LoadOne(payload: number): IActionWithPayload {
        return { type: JobNoteActions.LOAD_ONE, payload };
    }

    LoadOneSuccess(payload: IJobNote): IActionWithPayload {
        return { type: JobNoteActions.LOAD_ONE_SUCCESS, payload };
    }

    Add(payload: IJobNote): IActionWithPayload {
        return { type: JobNoteActions.ADD, payload };
    }

    AddSuccess(payload: IJobNote): IActionWithPayload {
        return { type: JobNoteActions.ADD_SUCCESS, payload };
    }

    Update(payload: IJobNote): IActionWithPayload {
        return { type: JobNoteActions.UPDATE, payload };
    }

    UpdateSuccess(payload: IJobNote): IActionWithPayload {
        return { type: JobNoteActions.UPDATE_SUCCESS, payload };
    }

    Remove(payload: IJobNote): IActionWithPayload {
        return { type: JobNoteActions.REMOVE, payload };
    }

    RemoveSuccess(payload: IJobNote): IActionWithPayload {
        return { type: JobNoteActions.REMOVE_SUCCESS, payload };
    }
}
