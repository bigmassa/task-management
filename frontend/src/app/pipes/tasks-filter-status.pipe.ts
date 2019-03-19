import * as _ from 'lodash';

import { Pipe, PipeTransform } from '@angular/core';

import { ITask } from '../state/reducers/task';

@Pipe({
    name: 'tasksFilterStatus',
    pure: true
})
export class TasksFilterStatusPipe implements PipeTransform {
    public transform(array: ITask[], ids: number[]): any {
        if (!ids || ids.length == 0) {
            return array;
        }
        return array.filter((ob) => this.filterObject(ob, ids));
    }

    private filterObject = (value: ITask, ids: number[]) => {
        return _.includes(ids, value.status);
    }
}