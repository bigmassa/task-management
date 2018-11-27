import * as _ from 'lodash';
import { createSelector } from '@ngrx/store';
import { getJobCollection } from './job';
import { getTaskAssigneeState, getTaskTagState, getTaskTimingState } from './../state';
import { getTaskFileState, getTaskNoteState, getTaskState } from '../state';
import { getTaskStatusState } from '../state';



export const getTaskAssigneesForTask = (id) => createSelector(
    getTaskAssigneeState,
    (assignees) => _.filter(assignees, ['task', id])
);

export const getTaskById = (id) => createSelector(
    getTaskState,
    (tasks) => _.find(tasks, ['id', id])
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
                _status: _.find(statuses, ['id', task.status])
            });
        });
        return _.orderBy(objects, ['order'], ['asc']);
    }
);

export const getTaskCollectionOpen = createSelector(
    getTaskCollection,
    (tasks) => _.filter(tasks, t => t.closed == false)
)

export const getTaskCollectionById = (id) => createSelector(
    getTaskCollection,
    (tasks) => _.find(tasks, ['id', id])
);

export const getTaskStateForJob = (id) => createSelector(
    getTaskState,
    (tasks) => {
        const objects = _.filter(tasks, ['job', id]);
        return _.orderBy(objects, ['order'], ['asc']);
    }
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

export const getTaskTagsForTask = (id) => createSelector(
    getTaskTagState,
    (tags) => _.filter(tags, ['object_id', id])
);

export const getTaskTimingsById = (id) => createSelector(
    getTaskTimingState,
    (tasks) => _.find(tasks, ['task', id])
);