import * as _ from 'lodash';
import * as actions from '../state/actions';
import { ActionsSubject, Store } from '@ngrx/store';
import { AppState } from '../state/state';
import {
    Component,
    Input,
    OnDestroy,
    OnInit
    } from '@angular/core';
import { ITask } from '../state/reducers/task';
import { ITaskStatus } from '../state/reducers/taskstatus';
import { Subscription } from 'rxjs';
import { TaskCreateForm } from '../forms/task-create.form';
import { calculateOrder } from '../utils/task';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
    selector: 'job-board-column, [job-board-column]',
    templateUrl: './job-board-column.component.html'
})
export class JobBoardColumnComponent implements OnDestroy, OnInit {

    @Input() jobId: number;
    @Input() status: ITaskStatus;
    @Input() tasks: ITask[];

    newForm: TaskCreateForm;
    newFormOpen = false;
    selectedTaskId: number = null;

    private subscriptions: Subscription[] = [];

    constructor(
        private store: Store<AppState>,
        private actionsSubject: ActionsSubject
    ) { }

    ngOnInit() {
        this.newForm = new TaskCreateForm(this.store, this.actionsSubject);
        this.subscriptions.push(this.newForm.formSaved.subscribe(() => this.newFormOpen = false));
    }

    dropTask(event: CdkDragDrop<ITask[]>) {
        // move the item in the ui
        if (event.previousContainer === event.container) {
            moveItemInArray(
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
          } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        }
        // calculate the correct order
        let order = calculateOrder(event.currentIndex, event.container.data, event.item.data);
        // dispatch an action to patch the task's new order and status
        const payload = {
            id: event.item.data.id,
            status: this.status.id,
            order: order
        }
        this.store.dispatch({type: actions.TaskActions.PATCH, payload});
    }

    newTask() {
        if (this.newFormOpen) {
            this.newFormOpen = false;
            return;
        }

        const data = {
            job: this.jobId,
            status: this.status.id,
            order: this.tasks.length > 0 ? this.tasks[0].order / 2 : 16384
        }
        this.newForm.patchValue(data);
        this.newFormOpen = true;
    }

    ngOnDestroy() {
        _.each(this.subscriptions, s => s.unsubscribe());
    }

}
