import * as _ from 'lodash';

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getTaskAssigneesForTask, getTaskCollectionById, getTaskTimingsById } from './../state/selectors/task';

import { AppState } from '../state/state';
import { ITask } from '../state/reducers/task';
import { ITaskAssignee } from './../state/reducers/taskassignee';
import { Observable } from 'rxjs';
import { ITaskTiming } from '../state/reducers/tasktiming';

@Component({
    selector: 'task-card, [task-card]',
    templateUrl: './task-card.component.html'
})
export class TaskCardComponent implements OnChanges {
    @Input() id: number;

    assignees$: Observable<ITaskAssignee[]>;
    task$: Observable<ITask>;
    timing$: Observable<ITaskTiming>;

    constructor(private store: Store<AppState>) {}

    ngOnChanges(changes: SimpleChanges) {
        if (_.has(changes, 'id.currentValue')) {
            this.assignees$ = this.store.pipe(select(getTaskAssigneesForTask(this.id)));
            this.task$ = this.store.pipe(select(getTaskCollectionById(this.id)));
            this.timing$ = this.store.pipe(select(getTaskTimingsById(this.id)));
        }
    }
}
