import { IActionWithPayload } from '../models';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FilterActions {

    static CLIENT = '[Filter] CLIENT';
    static JOB = '[Filter] JOB';
    static OVERDUE = '[Filter] OVERDUE';
    static USER = '[Filter] USER';
    static TASKBOARD_ORDERBY = '[Filter] TASKBOARD_ORDERBY';
    static TASKBOARD_SEARCH = '[Filter] TASKBOARD_SEARCH';
    static TASKBOARD_TOGGLE_STATUS = '[Filter] TASKBOARD_TOGGLE_STATUS';

    Client(payload: number): IActionWithPayload {
        return { type: FilterActions.CLIENT, payload };
    }

    Job(payload: number): IActionWithPayload {
        return { type: FilterActions.JOB, payload };
    }

    Overdue(payload: number): IActionWithPayload {
        return { type: FilterActions.OVERDUE, payload };
    }

    User(payload: number): IActionWithPayload {
        return { type: FilterActions.USER, payload };
    }

    TaskboardOrderBy(payload: {by: string, type: 'asc' | 'desc'}): IActionWithPayload {
        return { type: FilterActions.TASKBOARD_ORDERBY, payload };
    }

    TaskboardSearch(payload: string[]): IActionWithPayload {
        return { type: FilterActions.TASKBOARD_SEARCH, payload };
    }

    TaskboardToggleStatus(payload: number): IActionWithPayload {
        return { type: FilterActions.TASKBOARD_TOGGLE_STATUS, payload };
    }
}
