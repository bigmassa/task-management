import { IUser } from './user';
import { reduceState } from '../generics';

export interface IJobRelationship {
    id?: number;
    job: number;
    user: number;
    relationship: number;
    _user?: IUser;
    _relationship?: IJobRelationship;
}

export type State = IJobRelationship[];

export const initialState: State = [];

export function reducer(state = initialState, action: any): State {
    const actionPrefix = '[JobRelationship]';
    switch (action.type) {

        // Replace objects
        case `${actionPrefix} LOAD_ALL_SUCCESS`: {
            return reduceState(state, action, 'REPLACE_ALL');
        }

        case `${actionPrefix} REPLACE_MANY`: {
            return reduceState(state, action, 'REPLACE_MANY');
        }

        // Basic CRUD actions
        case `${actionPrefix} LOAD_ONE_SUCCESS`: {
            return reduceState(state, action, 'REPLACE_ONE');
        }

        case `${actionPrefix} ADD_SUCCESS`: {
            return reduceState(state, action, 'ADD_ONE');
        }

        case `${actionPrefix} UPDATE_SUCCESS`: {
            return reduceState(state, action, 'REPLACE_ONE');
        }

        case `${actionPrefix} PATCH_SUCCESS`: {
            return reduceState(state, action, 'REPLACE_ONE');
        }

        case `${actionPrefix} REMOVE_SUCCESS`: {
            return reduceState(state, action, 'REMOVE_ONE');
        }

        default:
            return state;
    }
}
