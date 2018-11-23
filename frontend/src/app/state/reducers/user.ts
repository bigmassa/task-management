import { reduceState } from '../generics';

export interface IUser {
    id: number;
    full_name: string;
    initials: string;
    is_active: boolean;
    is_gradwell_enabled: boolean;
}

export type State = IUser[];

export const initialState: State = [];

export function reducer(state = initialState, action: any): State {
    const actionPrefix = '[User]';
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

        default:
            return state;
    }
}
