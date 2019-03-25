import * as _ from 'lodash';

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { AppState } from '../state/state';
import { Observable } from 'rxjs';

@Component({
    selector: 'user-content, [user-content]',
    templateUrl: './user-content.component.html'
})
export class UserContentComponent {
    @Input() user_id: number;
    @Input() title: string;
    @Input() subtitle: string;

    constructor(private store: Store<AppState>) {}
}