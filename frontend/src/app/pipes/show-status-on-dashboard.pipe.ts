import * as _ from 'lodash';

import { Pipe, PipeTransform } from '@angular/core';

import { ITaskStatus } from '../state/reducers/taskstatus';

@Pipe({
    name: 'showStatusOnDashboard',
    pure: true
})
export class ShowStatusOnDashboardPipe implements PipeTransform {
    public transform(array: ITaskStatus[]): any {
        return _.filter(array, ['show_on_job_dashboard', true])
    }
}