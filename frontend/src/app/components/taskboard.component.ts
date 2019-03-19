import * as _ from 'lodash';
import { Observable, Subscription } from 'rxjs';

import { Component, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as actions from '../state/actions';
import { IFilter } from '../state/reducers/filter';
import { ITask } from '../state/reducers/task';
import { ITaskStatus } from '../state/reducers/taskstatus';
import { IUser } from '../state/reducers/user';
import { getTasksForTaskBoardForUser } from '../state/selectors/taskboard';
import { getActiveUsers } from '../state/selectors/user';
import { AppState, getFilterState, getMeState, getTaskStatusState } from '../state/state';

@Component({
    templateUrl: './taskboard.component.html'
})
export class TaskboardComponent implements OnDestroy {

    filteredStatuses: number[];
    orderBy: string;
    orderType: string;
    searchTerms: string[] = [];
    selectedUserId: number;
    subscriptions: Subscription[] = [];
    
    filters$: Observable<IFilter>;
    taskStatuses$: Observable<ITaskStatus[]>;
    tasks$: Observable<ITask[]>;
    users$: Observable<IUser[]>;

    constructor(
        private store: Store<AppState>
    ) { }

    ngOnInit() {
        this.filters$ = this.store.pipe(select(getFilterState));
        this.taskStatuses$ = this.store.pipe(select(getTaskStatusState));
        this.users$ = this.store.pipe(select(getActiveUsers));
        this.subscriptions.push(
            this.store.pipe(select(getMeState)).subscribe(me => {
                this.selectedUserId = me.id;
                this.refetchTasks();
            })
        )
        // assign current filters to local values
        // to more easily use in template
        this.subscriptions.push(
            this.filters$.subscribe(
                f => {
                    this.filteredStatuses = f.taskboard_statuses;
                    this.searchTerms = f.taskboard_search;
                    this.orderBy = f.taskboard_orderby.by;
                    this.orderType = f.taskboard_orderby.type;
                }
            )
        )
    }

    ngOnDestroy() {
        _.each(this.subscriptions, s => s.unsubscribe());
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

        this.store.dispatch({
            type: actions.FilterActions.TASKBOARD_ORDERBY,
            payload: {by, type: this.orderType}
        });
    }

    setSearch = () => {
        this.store.dispatch({type: actions.FilterActions.TASKBOARD_SEARCH, payload: this.searchTerms});
    }

    toggleStatus = (id: number) => {
        this.store.dispatch({type: actions.FilterActions.TASKBOARD_TOGGLE_STATUS, payload: id});
    }

}
