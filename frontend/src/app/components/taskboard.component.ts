import * as _ from 'lodash';

import { select, Store } from '@ngrx/store';
import { AppState, getMeState, getTaskStatusState } from '../state/state';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ITask } from '../state/reducers/task';
import { IUser } from '../state/reducers/user';
import { ITaskStatus } from '../state/reducers/taskstatus';

import { getTasksForTaskBoardForUser } from '../state/selectors/taskboard';
import { getActiveUsers } from '../state/selectors/user';

@Component({
    templateUrl: './taskboard.component.html'
})
export class TaskboardComponent {

    orderBy: string = 'target_date';
    orderType: string = 'asc';
    searchTerms: string[] = [];
    selectedUserId: number;
    tasks$: Observable<ITask[]>;
    users$: Observable<IUser[]>;

    taskStatuses$: Observable<ITaskStatus[]>;
    filteredStatuses: number[] = [];

    constructor(
        private store: Store<AppState>
    ) { }

    ngOnInit() {
        this.users$ = this.store.pipe(select(getActiveUsers));
        this.store.pipe(select(getMeState)).subscribe(me => {
            this.selectedUserId = me.id;
            this.refetchTasks();
        });
        this.taskStatuses$ = this.store.pipe(select(getTaskStatusState));
    }

    refetchTasks() {
        this.tasks$ = this.store.pipe(select(getTasksForTaskBoardForUser(this.selectedUserId)));
    }

    orderTasksBy(by: string) {
        if (by != this.orderBy) {
            this.orderType = 'asc';
        } else {
            this.orderType = this.orderType == 'asc' ? 'desc' : 'asc';
        }
        this.orderBy = by;
    }

    filterTaskStatusesBy(by: number) {
        if (_.includes(this.filteredStatuses, by)) {
            this.filteredStatuses = _.pull(this.filteredStatuses, by);
        } else {
            this.filteredStatuses.push(by);
        }

        console.log(this.filteredStatuses);
    }
}
