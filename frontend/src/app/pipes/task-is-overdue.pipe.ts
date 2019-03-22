import * as _ from 'lodash';

import { Pipe, PipeTransform } from '@angular/core';

import { ITask } from '../state/reducers/task';

@Pipe({
    name: 'taskIsOverdue',
    pure: true
})
export class TaskIsOverduePipe implements PipeTransform {
    public transform(array: ITask[]): any {
        return _.filter(array, ['is_overdue', true])
    }
}