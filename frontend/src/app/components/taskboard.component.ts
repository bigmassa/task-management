import { select, Store } from '@ngrx/store';
import { AppState, getMeState } from '../state/state';
import { Component } from '@angular/core';
import { getTasksForTaskBoardForUser } from '../state/selectors/taskboard';
import { ITask } from '../state/reducers/task';
import { Observable } from 'rxjs';
import { IUser } from '../state/reducers/user';
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

    constructor(
        private store: Store<AppState>
    ) { }

    ngOnInit() {
        this.users$ = this.store.pipe(select(getActiveUsers));
        this.store.pipe(select(getMeState)).subscribe(me => {
            this.selectedUserId = me.id;
            this.refetchTasks();
        });
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
}
