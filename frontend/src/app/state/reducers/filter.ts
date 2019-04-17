import * as _ from 'lodash';

export interface IFilter {
    client: number;
    job: number;
    overdue: boolean;
    user: number;
    taskboard_search: string[];
    taskboard_statuses: number[];
    taskboard_orderby: {by: string, type: 'asc' | 'desc'};
}

export type State = IFilter;

export const initialState: State = {
    client: null,
    job: null,
    overdue: null,
    user: null,
    taskboard_search: [],
    taskboard_statuses: [],
    taskboard_orderby: {by: 'target_date', type: 'asc'}
};

export function reducer(state = initialState, action: any): State {
    const actionPrefix = '[Filter]';
    
    switch (action.type) {

        case `${actionPrefix} CLIENT`: {
            return _.assign({}, state, { client: action.payload })
        }

        case `${actionPrefix} JOB`: {
            return _.assign({}, state, { job: action.payload })
        }

        case `${actionPrefix} OVERDUE`: {
            return _.assign({}, state, { overdue: action.payload })
        }

        case `${actionPrefix} USER`: {
            return _.assign({}, state, { user: action.payload })
        }

        case `${actionPrefix} TASKBOARD_ORDERBY`: {
            return _.assign({}, state, { taskboard_orderby: action.payload })
        }

        case `${actionPrefix} TASKBOARD_SEARCH`: {
            return _.assign({}, state, { taskboard_search: action.payload })
        }

        case `${actionPrefix} TASKBOARD_TOGGLE_STATUS`: {
            const index = _.indexOf(state.taskboard_statuses, action.payload);
            let statuses: number[] = [];
            if (index > -1) {
                state.taskboard_statuses.splice(index, 1);
                statuses = state.taskboard_statuses;
            } else {
                statuses = [...state.taskboard_statuses, action.payload];
            }
            return _.assign({}, state, { taskboard_statuses: statuses })
        }
        
        default:
            return state;
    }
}
