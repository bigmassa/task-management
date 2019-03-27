import * as _ from 'lodash';

import { Component, Input } from '@angular/core';

@Component({
    selector: 'user-content, [user-content]',
    templateUrl: './user-content.component.html'
})
export class UserContentComponent {
    @Input() user_id: number;
    @Input() title: string;
    @Input() subtitle: string;

    constructor() {}
}