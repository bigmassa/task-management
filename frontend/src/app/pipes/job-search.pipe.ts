import * as _ from 'lodash';

import { Pipe, PipeTransform } from '@angular/core';

import { IJob } from '../state/reducers/job';
import { valueOr } from '../utils/generic';

@Pipe({
    name: 'jobSearch',
    pure: true
})
export class JobSearchPipe implements PipeTransform {
    public transform(array: IJob[], terms: string[]): any {
        if (!terms || terms.length == 0) {
            return array;
        }
        return array.filter((ob) => this.filterObject(ob, terms));
    }

    private filterObject = (value: IJob, terms: string[]) => {
        let found: boolean = true;
        _.each(terms, (term) => {
            if (!_.includes(valueOr(value.title).toLowerCase(), term.toLowerCase()) &&
                !_.includes(valueOr(value._status.title).toLowerCase(), term.toLowerCase())
            ) {
                found = false;
            }
        });
        return found;
    }
}