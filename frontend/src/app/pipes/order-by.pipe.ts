import * as _ from 'lodash';

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderBy',
    pure: true
})
export class OrderByPipe implements PipeTransform {
    public transform(objects: any[], fields: string[], type: any[]): any {
        return _.orderBy(objects, fields, type);
    }
}