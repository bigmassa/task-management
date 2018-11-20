import * as _ from 'lodash';
import { createSelector } from '@ngrx/store';
import {
    getBillingFrequencyState,
    getJobFileState,
    getPaymentOptionState,
    getRecurringCostTypeState,
    getUserState
    } from './../state';
import {
    getClientState,
    getJobNoteState,
    getJobRecurringCostState,
    getJobRelationshipState,
    getJobState,
    getJobStatusState,
    getJobTypeState,
    getRelationshipState
    } from '../state';
import { readableTextColor } from '../../utils/colour';



export const getJobCollection = createSelector(
    getClientState,
    getJobState,
    getJobStatusState,
    getJobTypeState,
    (clients, jobs, statuses, types) => {
        if (_.isEmpty(clients) || _.isEmpty(jobs) || _.isEmpty(statuses) || _.isEmpty(types)) {
            return [];
        }
        
        const objects = _.map(jobs, (job) => {
            return _.assign({}, job, {
                _client: _.find(clients, ['id', job.client]),
                _status: _.find(statuses, ['id', job.status]),
                _type: _.find(types, ['id', job.type]),
                _text_colour: readableTextColor(job.colour)
            });
        });
        return _.orderBy(objects, ['title'], ['asc']);
    }
);

export const getJobCollectionById = (id) => createSelector(
    getJobCollection,
    (jobs) => _.find(jobs, ['id', id])
);

export const getJobCollectionForClient = (id) => createSelector(
    getJobCollection,
    (jobs) => _.filter(jobs, ['client', id])
);

export const getJobFilesForJob = (id) => createSelector(
    getJobFileState,
    (files) => _.filter(files, ['job', id])
);

export const getJobNoteCollection = createSelector(
    getJobNoteState,
    getUserState,
    (notes, users) => {
        const objects = _.map(notes, (note) => {
            return _.assign({}, note, {
                _user: _.find(users, ['id', note.user])
            });
        });
        return _.orderBy(objects, ['updated_at'], ['desc'])
    }
);

export const getJobNoteCollectionForJob = (id) => createSelector(
    getJobNoteCollection,
    (notes) => _.filter(notes, ['job', id])
);

export const getJobRecurringCostCollection = createSelector(
    getJobRecurringCostState,
    getRecurringCostTypeState,
    getBillingFrequencyState,
    getPaymentOptionState,
    (costs, types, frequencies, options) => {
        const objects = _.map(costs, (cost) => {
            return _.assign({}, cost, {
                _type: _.find(types, ['id', cost.type]),
                _billing_frequency: _.find(frequencies, ['id', cost.billing_frequency]),
                _payment_option: _.find(options, ['id', cost.payment_option])
            });
        });
        return _.orderBy(objects, ['_type.title'], ['asc']);
    }
);

export const getJobRecurringCostCollectionForJob = (id) => createSelector(
    getJobRecurringCostCollection,
    (costs) => _.filter(costs, ['job', id])
);

export const getJobRecurringCostCollectionById = (id) => createSelector(
    getJobRecurringCostCollection,
    (costs) => _.find(costs, ['id', id])
);

export const getJobRelationshipCollection = createSelector(
    getJobRelationshipState,
    getUserState,
    getRelationshipState,
    (jobRelationships, users, relationships) => {
        const objects = _.map(jobRelationships, (jobRelationship) => {
            return _.assign({}, jobRelationship, {
                _user: _.find(users, ['id', jobRelationship.user]),
                _relationship: _.find(relationships, ['id', jobRelationship.relationship])
            });
        });
        return _.orderBy(objects, ['_user.full_name'], ['asc']);
    }
);

export const getJobRelationshipCollectionForJob = (id) => createSelector(
    getJobRelationshipCollection,
    (relationships) => _.filter(relationships, ['job', id])
);

export const getJobRelationshipCollectionById = (id) => createSelector(
    getJobRelationshipCollection,
    (relationships) => _.find(relationships, ['id', id])
);