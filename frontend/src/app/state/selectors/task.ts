import * as _ from 'lodash';

import { getTaskFileState, getTaskNoteState, getTaskState } from '../state';

import { createSelector } from '@ngrx/store';
import { getJobCollection } from './job';
import { getTaskAssigneeState } from './../state';
import { getTaskStatusState } from '../state';

export const getTaskAssigneesForTask = (id) => createSelector(
    getTaskAssigneeState,
    (assignees) => _.filter(assignees, ['task', id])
);

export const getTaskCollection = createSelector(
    getJobCollection,
    getTaskState,
    getTaskStatusState,
    (jobs, tasks, statuses) => {
        if (_.isEmpty(jobs) || _.isEmpty(tasks) || _.isEmpty(statuses)) {
            return [];
        }
        
        const objects = _.map(tasks, (task) => {
            return _.assign({}, task, {
                _job: _.find(jobs, ['id', task.job]),
                _status: _.find(statuses, ['id', task.status]),
                _is_over_allocated_hours: +task.time_spent_hours > +task.allocated_hours
            });
        });
        return _.orderBy(objects, ['order'], ['asc']);
    }
);

export const getTaskCollectionById = (id) => createSelector(
    getTaskCollection,
    (tasks) => _.find(tasks, ['id', id])
);

export const getTaskCollectionForJob = (id) => createSelector(
    getTaskCollection,
    (tasks) => _.filter(tasks, ['job', id])
);

export const getTaskFilesForTask = (id) => createSelector(
    getTaskFileState,
    (files) => _.filter(files, ['task', id])
);

export const getTaskNotes = createSelector(
    getTaskNoteState,
    (notes) => _.orderBy(notes, ['updated_at'], ['desc'])
);

export const getTaskNotesForTask = (id) => createSelector(
    getTaskNotes,
    (notes) => _.filter(notes, ['task', id])
);
