import * as _ from 'lodash';

import { ITask } from '../state/reducers/task';
import { ITaskAssignee } from '../state/reducers/taskassignee';

export const calculateOrder = (dropIndex: number, tasks: ITask[]) => {
    const initialOrder = 16384;
    const lastIndex = _.findLastIndex(tasks);
    let order = 0;
    if (tasks.length === 1) {
        // this is the only task so order is default
        order = initialOrder;
    } else if (dropIndex === 0) {
        // task moved to start so half the next order value
        order = tasks[dropIndex+1].order / 2;
    } else if (dropIndex === lastIndex) {
        // task was moved to the end so add the default to the second from last
        order = tasks[dropIndex-1].order + initialOrder;
    } else {
        // task is in the middle so find the diff between the adjacent tasks
        const prev = tasks[dropIndex-1].order;
        const next = tasks[dropIndex+1].order;
        order = ((next - prev) / 2) + prev;
    }
    return order
}

export const calculateTaskBoardOrder = (dropIndex: number, tasks: ITask[], assignee: ITaskAssignee) => {
    const initialOrder = 16384;
    const lastIndex = _.findLastIndex(tasks);
    let order = 0;
    if (tasks.length === 1) {
        // this is the only task so order is default
        order = initialOrder;
    } else if (dropIndex === 0) {
        // task moved to start so half the next order value
        order = findOrderForUser(tasks[dropIndex+1], assignee.user) / 2;
    } else if (dropIndex === lastIndex) {
        // task was moved to the end so add the default to the second from last
        order = findOrderForUser(tasks[dropIndex-1], assignee.user) + initialOrder;
    } else {
        // task is in the middle so find the diff between the adjacent tasks
        const prev = findOrderForUser(tasks[dropIndex-1], assignee.user);
        const next = findOrderForUser(tasks[dropIndex+1], assignee.user);
        order = ((next - prev) / 2) + prev;
    }
    return order
}

const findOrderForUser = (task: ITask, userId: number) => {
    return _.find(task._assignees, ['user', userId]).board_order;
}