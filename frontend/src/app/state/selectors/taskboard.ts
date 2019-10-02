import * as _ from 'lodash';
import { createSelector } from '@ngrx/store';
import { getTaskAssigneeState, getFilterState } from '../state';
import { getTaskCollectionOpen } from './task';
import { TaskSearchPipe } from 'src/app/pipes/task-search.pipe';
import { ITask } from '../reducers/task';
import { IFilter } from '../reducers/filter';
import { ITaskAssignee } from '../reducers/taskassignee';

export const getTasksForTaskListForUser = (user: number) => createSelector(
    getTaskCollectionOpen,
    getTaskAssigneeState,
    getFilterState,
    (tasks, assignees, filters) => {
        let mappedTasks = getMappedTasksForUser(tasks, user, filters, assignees);

        if (filters.taskboard_orderby.by && filters.taskboard_orderby.type) {
            return _.orderBy(mappedTasks, [filters.taskboard_orderby.by], [filters.taskboard_orderby.type]);
        } else {
            return _.orderBy(mappedTasks, ['target_date'], ['asc']);
        }
    }
)

export const getTasksForTaskBoardForUser = (user: number) => createSelector(
    getTaskCollectionOpen,
    getTaskAssigneeState,
    getFilterState,
    (tasks, assignees, filters) => {
        return getMappedAssigneesForUser(tasks, user, filters, assignees);
    }
)

const getMappedTasksForUser = (tasks: ITask[], user: number, filters: IFilter, assignees: ITaskAssignee[]) => {
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

    return mappedObjs;
}

const getMappedAssigneesForUser = (tasks: ITask[], user: number, filters: IFilter, assignees: ITaskAssignee[]) => {
    let objs = tasks;

    // only tasks assigned to user
    let filteredAssignees = _.orderBy(_.filter(assignees, ['user', user]), ['board_order'], ['asc']);
    let ids = _.map(filteredAssignees, 'task');

    objs = _.orderBy(
        _.filter(objs, o => _.includes(ids, o.id)),
        (e) => _.indexOf(ids, e.id)
    );

    // filter by search terms if they exist
    if (filters.taskboard_search) {
        objs = new TaskSearchPipe().transform(objs, filters.taskboard_search);
    }

    // map assignees as a property
    const mappedObjs = _.map(objs, o => _.assign({}, o, {
        _assignees: _.filter(assignees, ['task', o.id])
    }))

    return mappedObjs;
}