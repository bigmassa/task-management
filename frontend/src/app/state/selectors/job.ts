import * as _ from 'lodash';

import { getClientState, getJobState, getJobStatusState } from '../state';

import { createSelector } from '@ngrx/store';

export const getJobCollection = createSelector(
    getClientState,
    getJobState,
    getJobStatusState,
    (clients, jobs, statuses) => {
        const objects = _.map(jobs, (job) => {
            return _.assign({}, job, {
                _status: _.find(statuses, ['id', job.status]),
                _client: _.find(clients, ['id', job.client])
            });
        });
        return _.orderBy(objects, ['title'], ['asc']);
    }
);

export const getJobCollectionForClient = (id) => createSelector(
    getJobCollection,
    (jobs) => _.filter(jobs, ['client', id])
);
