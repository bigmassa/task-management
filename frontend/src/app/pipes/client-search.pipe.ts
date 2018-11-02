import * as _ from 'lodash';

import { Pipe, PipeTransform } from '@angular/core';

import { IClient } from '../state/reducers/client';
import { valueOr } from '../utils/generic';

@Pipe({
    name: 'clientSearch',
    pure: true
})
export class ClientSearchPipe implements PipeTransform {
    public transform(array: IClient[], terms: string[]): any {
        if (!terms || terms.length == 0) {
            return array;
        }
        return array.filter((ob) => this.filterObject(ob, terms));
    }

    private filterObject = (value: IClient, terms: string[]) => {
        let found: boolean = true;
        _.each(terms, (term) => {
            if (!_.includes(valueOr(value.name).toLowerCase(), term.toLowerCase()) &&
                !_.includes(valueOr(value.phone_number).toLowerCase(), term.toLowerCase()) &&
                !_.includes(valueOr(value.email_address).toLowerCase(), term.toLowerCase()) &&
                !_.includes(valueOr(value.website).toLowerCase(), term.toLowerCase()) &&
                !_.includes(valueOr(value.address).toLowerCase(), term.toLowerCase())
            ) {
                found = false;
            }
        });
        return found;
    }
}