import { ActionsSubject, select, Store } from '@ngrx/store';
import { AppState } from '../state/state';
import { Component } from '@angular/core';
import { getTasksForTaskBoardForUser } from '../state/selectors/taskboard';
import { ITask } from '../state/reducers/task';
import { Observable } from 'rxjs';

@Component({
    selector: 'taskboard, [taskboard]',
    templateUrl: './taskboard.component.html'
})
export class TaskboardComponent {

    tasks$: Observable<ITask[]>;
    
    constructor(
        private store: Store<AppState>
    ) { }

    ngOnInit() {
        this.tasks$ = this.store.pipe(select(getTasksForTaskBoardForUser(1)));
    }
}
