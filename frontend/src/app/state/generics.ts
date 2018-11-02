import * as _ from 'lodash';

import { IActionWithPayload } from './models';

export function reduceState (state: any, action: IActionWithPayload, type: string) {
    switch (type) {
        case 'REPLACE_ALL':
            return action.payload;

        case 'REPLACE_MANY':
            _.each(action.payload, obj => {
                const index = _.findIndex(state, { id: obj.id });
                if (index >= 0) {
                    state = [
                        ...state.slice(0, index),
                        obj,
                        ...state.slice(index + 1)
                    ]
                } else {
                    state = [...state, obj]
                }
            });
            return [...state];

        case 'REPLACE_ONE':
            const index = _.findIndex(state, { id: action.payload.id });
            if (index >= 0) {
                return [
                    ...state.slice(0, index),
                    action.payload,
                    ...state.slice(index + 1)
                ];
            }
            return [...state, action.payload];

        case 'ADD_ONE':
            return [...state, action.payload];

        case 'REMOVE_ONE':
            return _.filter(state, (obj: any) => obj.id !== action.payload.id);

        default:
            return state;
    }
}
