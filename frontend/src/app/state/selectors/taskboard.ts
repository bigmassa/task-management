import * as _ from 'lodash';
import { createSelector } from '@ngrx/store';
import { getTaskAssigneeState, getFilterState } from '../state';
import { getTaskCollectionOpen } from './task';
import { TaskSearchPipe } from 'src/app/pipes/task-search.pipe';

export const getTasksForTaskBoardForUser = (user: number, ignoreOrdering: boolean) => createSelector(
    getTaskCollectionOpen,
    getTaskAssigneeState,
    getFilterState,
    (tasks, assignees, filters) => {
        let objs = tasks;
        
        // only tasks assigned to user
        let ids = _.map(_.filter(assignees, ['user', user]), 'task');
        objs = _.filter(objs, o => _.includes(ids, o.id));

        // filter by search terms if they exist
        if (filters.taskboard_search) {
            objs = new TaskSearchPipe().transform(objs, filters.taskboard_search);
        }

        // map assignees as a property
        const mappedObjs = _.map(objs, o => _.assign({}, o, {
            _assignees: _.filter(assignees, ['task', o.id])
        }))

        if (ignoreOrdering) return mappedObjs;

        if (filters.taskboard_orderby.by && filters.taskboard_orderby.type) {
            return _.orderBy(mappedObjs, [filters.taskboard_orderby.by], [filters.taskboard_orderby.type]);
        } else {
            return _.orderBy(mappedObjs, ['target_date'], ['asc']);
        }
    }
)