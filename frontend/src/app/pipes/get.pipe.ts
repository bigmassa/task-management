import * as _ from 'lodash';

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'get',
    pure: true
})
export class GetPipe implements PipeTransform {
    public transform(object: any, path: string, fallback: string = '-'): any {
        return _.get(object, path, fallback) || fallback;
    }
}