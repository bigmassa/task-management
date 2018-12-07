import * as _ from 'lodash';
import * as actions from '../state/actions';
import { ActionsSubject, Store } from '@ngrx/store';
import { AppState } from '../state/state';
import {
    Component,
    Input,
    OnDestroy,
    OnInit,
    HostListener
    } from '@angular/core';
import { ITask } from '../state/reducers/task';
import { ITaskStatus } from '../state/reducers/taskstatus';
import { Subscription } from 'rxjs';
import { TaskCreateForm } from '../forms/task-create.form';
import { DrakeStoreService } from '@swimlane/ngx-dnd';
import { calculateOrder } from '../utils/task';

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
        private actionsSubject: ActionsSubject,
        private drakeStore: DrakeStoreService
    ) { }

    ngOnInit() {
        this.newForm = new TaskCreateForm(this.store, this.actionsSubject);
        this.subscriptions.push(this.newForm.formSaved.subscribe(() => this.newFormOpen = false));
    }

    dropTask(event: any) {
        let order = calculateOrder(event.dropIndex, this.tasks, event.value);
        // dispatch an action to patch the task's new order and status
        const payload = {
            id: event.value.id,
            status: this.status.id,
            order: order
        }
        this.store.dispatch({type: actions.TaskActions.PATCH, payload});
    }

    @HostListener('document:keydown.escape', ['$event']) 
    cancelDrag(event: KeyboardEvent) {
        (this.drakeStore as any).drake.cancel(true);
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
