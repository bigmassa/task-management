import { Action } from '@ngrx/store';
import { IActionWithPayload } from '../models';
import { IRelationship } from '../reducers/relationship';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RelationshipActions {

    static LOAD_ALL = '[Relationship] LOAD_ALL';
    static LOAD_ALL_SUCCESS = '[Relationship] LOAD_ALL_SUCCESS';
    static LOAD_ONE = '[Relationship] LOAD_ONE';
    static LOAD_ONE_SUCCESS = '[Relationship] LOAD_ONE_SUCCESS';
    static ADD = '[Relationship] ADD';
    static ADD_SUCCESS = '[Relationship] ADD_SUCCESS';
    static UPDATE = '[Relationship] UPDATE';
    static UPDATE_SUCCESS = '[Relationship] UPDATE_SUCCESS';
    static REMOVE = '[Relationship] REMOVE';
    static REMOVE_SUCCESS = '[Relationship] REMOVE_SUCCESS';

    LoadAll(): Action {
        return { type: RelationshipActions.LOAD_ALL };
    }

    LoadAllSuccess(payload: IRelationship[]): IActionWithPayload {
        return { type: RelationshipActions.LOAD_ALL_SUCCESS, payload };
    }

    LoadOne(payload: number): IActionWithPayload {
        return { type: RelationshipActions.LOAD_ONE, payload };
    }

    LoadOneSuccess(payload: IRelationship): IActionWithPayload {
        return { type: RelationshipActions.LOAD_ONE_SUCCESS, payload };
    }

    Add(payload: IRelationship): IActionWithPayload {
        return { type: RelationshipActions.ADD, payload };
    }

    AddSuccess(payload: IRelationship): IActionWithPayload {
        return { type: RelationshipActions.ADD_SUCCESS, payload };
    }

    Update(payload: IRelationship): IActionWithPayload {
        return { type: RelationshipActions.UPDATE, payload };
    }

    UpdateSuccess(payload: IRelationship): IActionWithPayload {
        return { type: RelationshipActions.UPDATE_SUCCESS, payload };
    }

    Remove(payload: IRelationship): IActionWithPayload {
        return { type: RelationshipActions.REMOVE, payload };
    }

    RemoveSuccess(payload: IRelationship): IActionWithPayload {
        return { type: RelationshipActions.REMOVE_SUCCESS, payload };
    }
}
