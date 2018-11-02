import { reduceState } from '../generics';

export interface IClient {
    id?: number;
    name: string;
    colour: string;
    phone_number?: string;
    email_address?: string;
    website?: string;
    address?: string;
    notes?: string;
}

export type State = IClient[];

export const initialState: State = [];

export function reducer(state = initialState, action: any): State {
    const actionPrefix = '[Client]';
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

        case `${actionPrefix} REMOVE_SUCCESS`: {
            return reduceState(state, action, 'REMOVE_ONE');
        }

        default:
            return state;
    }
}
