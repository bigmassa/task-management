import { IBillingFrequency } from './billingfrequency';
import { IPaymentOption } from './paymentoption';
import { IRecurringCostType } from './recurringcosttype';
import { reduceState } from '../generics';

export interface IJobRecurringCost {
    id?: number;
    job: number;
    type: number;
    last_invoiced_date?: string;
    billing_interval: number;
    billing_frequency: number;
    payment_option: number;
    _type?: IRecurringCostType;
    _billing_frequency?: IBillingFrequency;
    _payment_option?: IPaymentOption;
}

export type State = IJobRecurringCost[];

export const initialState: State = [];

export function reducer(state = initialState, action: any): State {
    const actionPrefix = '[JobRecurringCost]';
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
