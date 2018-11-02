import * as _ from 'lodash';

import { Pipe, PipeTransform } from '@angular/core';

import { ITask } from '../state/reducers/task';

@Pipe({
    name: 'tasksByStatus',
    pure: true
})
export class TasksByStatusPipe implements PipeTransform {
    public transform(array: ITask[], status: number): any {
        return _.filter(array, ['status', status])
    }
}