import * as _ from 'lodash';

import { Pipe, PipeTransform } from '@angular/core';

import { ITask } from '../state/reducers/task';

@Pipe({
    name: 'taskHasStatus',
    pure: true
})
export class TaskHasStatusPipe implements PipeTransform {
    public transform(array: ITask[], status: string): any {
        return _.filter(array, ['status', status])
    }
}