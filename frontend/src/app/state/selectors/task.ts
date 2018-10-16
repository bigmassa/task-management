import * as _ from 'lodash';

import { getTaskAssigneeState, getTaskNoteState, getTaskState } from '../state';

import { createSelector } from '@ngrx/store';
import { getJobCollection } from './job';
import { getTaskStatusState } from '../state';

export const getTaskNotes = createSelector(
    getTaskNoteState,
    (notes) => _.orderBy(notes, ['updated_at'], ['desc'])
);

export const getTaskCollection = createSelector(
    getJobCollection,
    getTaskState,
    getTaskAssigneeState,
    getTaskNotes,
    getTaskStatusState,
    (jobs, tasks, assignees, notes, statuses) => {
        const objects = _.map(tasks, (task) => {
            const foundAssignees = _.filter(assignees, ['task', task.id]);
            const time_spent = _.sumBy(foundAssignees, a => +a.time_spent_hours).toFixed(2);
            const allocated = _.sumBy(foundAssignees, a => +a.allocated_hours).toFixed(2);
            return _.assign({}, task, {
                _job: _.find(jobs, ['id', task.job]),
                _assignees: foundAssignees,
                _notes: _.filter(notes, ['task', task.id]),
                _status: _.find(statuses, ['id', task.status]),
                _time_spent_hours: time_spent,
                _allocated_hours: allocated,
                _is_over_allocated_hours: +time_spent > +allocated
            });
        });
        return _.orderBy(objects, ['order'], ['asc']);
    }
);

export const getTaskCollectionById = (id) => createSelector(
    getTaskCollection,
    (tasks) => _.find(tasks, ['id', id])
);

export const getTaskAssigneeCollection = createSelector(
    getTaskAssigneeState,
    getTaskCollection,
    (assignees, tasks) => {
        const objects = _.map(assignees, assignee => {
            return _.assign({}, assignee, {
                _task: _.find(tasks, ['id', assignee.task])
            });
        })
        return _.orderBy(objects, ['order'], ['asc']);
    }
);
