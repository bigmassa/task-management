import { IPosition } from './position';
import { reduceState } from '../generics';

export interface IClientContact {
    id?: number;
    client: number;
    first_name: string;
    last_name: string;
    phone_number: string;
    mobile_number: string;
    email_address: string;
    address: string;
    position: string;
    notes: string;
    _position?: IPosition;
}

export type State = IClientContact[];

export const initialState: State = [];

export function reducer(state = initialState, action: any): State {
    const actionPrefix = '[ClientContact]';
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
