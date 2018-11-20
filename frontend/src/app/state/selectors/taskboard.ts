import * as _ from 'lodash';
import { createSelector } from '@ngrx/store';
import { getTaskAssigneeState } from '../state';
import { getTaskCollection } from './task';

export const getTasksForTaskBoard = createSelector(
    getTaskCollection,
    (tasks) => _.filter(tasks, t => t.closed == false)
)

export const getTasksForTaskBoardForUser = (id: number = null) => createSelector(
    getTasksForTaskBoard,
    getTaskAssigneeState,
    (tasks, assignees) => {
        let objs = tasks;
        
        // only tasks assigned to user
        let ids = _.map(_.filter(assignees, ['user', id]), 'task');
        objs = _.filter(objs, o => _.includes(ids, o.id));

        const mappedObjs = _.map(objs, o => _.assign({}, o, {
            _assignees: _.filter(assignees, ['task', o.id])
        }))

        return mappedObjs;
    }
)