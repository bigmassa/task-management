import * as _ from 'lodash';

import { Pipe, PipeTransform } from '@angular/core';

import { ITask } from '../state/reducers/task';
import { valueOr } from '../utils/generic';

@Pipe({
    name: 'taskSearch',
    pure: true
})
export class TaskSearchPipe implements PipeTransform {
    public transform(array: ITask[], terms: string[]): any {
        if (!terms || terms.length == 0) {
            return array;
        }
        return array.filter((ob) => this.filterObject(ob, terms));
    }

    private filterObject = (value: ITask, terms: string[]) => {
        let found: boolean = true;
        _.each(terms, (term) => {
            if (!_.includes(value.id.toString(), term.toLowerCase()) &&
                !_.includes(value.title.toLowerCase(), term.toLowerCase()) &&
                !_.includes(valueOr(value._job.title).toLowerCase(), term.toLowerCase()) &&
                !_.includes(valueOr(value._job._client.name).toLowerCase(), term.toLowerCase()) &&
                !_.includes(valueOr(value._status.title).toLowerCase(), term.toLowerCase())
            ) {
                found = false;
            }
        });
        return found;
    }
}