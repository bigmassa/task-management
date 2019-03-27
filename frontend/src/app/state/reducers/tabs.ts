import * as _ from 'lodash';

export interface ITab {
    title: string,
    active: boolean
}

export interface ITabs {
    client: ITab[],
    job: ITab[]
}

export type State = ITabs;

export const initialState: State = {
    client: [
        { title: 'Dashboard', active: true },
        { title: 'Jobs', active: false },
        { title: 'Closed Jobs', active: false },
        { title: 'Contacts', active: false }
    ],
    job: [
        { title: 'Dashboard', active: true },
        { title: 'Tasks', active: false },
        { title: 'Notes', active: false },
        { title: 'Files', active: false },
        { title: 'Relationships', active: false },
        { title: 'Recurring Costs', active: false }
    ]
};

export function reducer(state = initialState, action: any): State {
    let index;

    switch (action.type) {
    
        case '[Tabs] CLIENT_ACTIVATE_TAB':
            index = _.findIndex(state.client, { title: action.payload.title });
            _.forEach(state.client, (c, i) => { state.client[i].active = false });
            state.client[index].active = true;
            return state;

        case '[Tabs] JOB_ACTIVATE_TAB':
            index = _.findIndex(state.job, { title: action.payload.title });
            _.forEach(state.job, (c, i) => { state.job[i].active = false });
            state.job[index].active = true;
            return state;

        default:
            return state;
    }
}
