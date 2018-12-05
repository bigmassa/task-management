import { ActionsSubject, select, Store } from '@ngrx/store';
import { AppState } from '../state/state';
import { Component } from '@angular/core';
import { getTasksForTaskBoardForUser } from '../state/selectors/taskboard';
import { ITask } from '../state/reducers/task';
import { Observable } from 'rxjs';

@Component({
    templateUrl: './taskboard.component.html'
})
export class TaskboardComponent {

    orderBy: string = 'target_date';
    orderType: string = 'asc';
    tasks$: Observable<ITask[]>;
    searchTerms: string[] = [];
    
    constructor(
        private store: Store<AppState>
    ) { }

    ngOnInit() {
        this.tasks$ = this.store.pipe(select(getTasksForTaskBoardForUser));
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
