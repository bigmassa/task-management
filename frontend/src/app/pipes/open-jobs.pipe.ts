import * as _ from 'lodash';

import { Pipe, PipeTransform } from '@angular/core';

import { IJob } from '../state/reducers/job';

@Pipe({
    name: 'openJobs',
    pure: true
})
export class OpenJobsPipe implements PipeTransform {
    public transform(array: IJob[]): any {
        return _.filter(array, ['_status.closed', false])
    }
}