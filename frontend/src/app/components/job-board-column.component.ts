import * as _ from 'lodash';
import * as actions from '../state/actions';
import { ActionsSubject, Store, select } from '@ngrx/store';
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
import { getMeState } from '../state/state';
import { calculateOrder, calculateTaskBoardOrder } from '../utils/task';

@Component({
    selector: 'job-board-column, [job-board-column]',
    templateUrl: './job-board-column.component.html'
})
export class JobBoardColumnComponent implements OnDestroy, OnInit {

    @Input() jobId: number;
    @Input() status: ITaskStatus;
    @Input() tasks: ITask[];
    @Input() show_job_details: boolean;
    @Input() readonly: boolean;
    @Input() selected_user_id: number;

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
        this.subscriptions.push(
            this.newForm.formSaved.subscribe(() => this.newFormOpen = false)
        );
    }

    dropTask(event: any) {
        if (this.readonly) {
            this.changePersonalOrder(event);
        } else {
            this.changeOrder(event);
        }
    }

    changeOrder(event: any) {
        let order = calculateOrder(event.dropIndex, this.tasks);
        // dispatch an action to patch the task's new order and status
        const payload = {
            id: event.value.id,
            status: this.status.id,
            order: order
        }
        this.store.dispatch({type: actions.TaskActions.PATCH, payload});
    }

    changePersonalOrder(event: any) {
        let task = event.value as ITask;
        let assignee = _.find(task._assignees, ['user', this.selected_user_id]);
        let order = calculateTaskBoardOrder(event.dropIndex, this.tasks, assignee);

        // dispatch an action to patch the task's new order and status
        const assigneePayload = {
            id: assignee.id,
            board_order: order
        }

        this.store.dispatch({type: actions.TaskAssigneeActions.PATCH, payload: assigneePayload});

        if (task.status == this.status.id) return;

        const taskPayload = {
            id: task.id,
            status: this.status.id
        }
        
        this.store.dispatch({type: actions.TaskActions.PATCH, payload: taskPayload});
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
