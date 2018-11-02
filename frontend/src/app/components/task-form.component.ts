import * as _ from 'lodash';

import { ActionsSubject, Store, select } from '@ngrx/store';
import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { getTaskAssigneesForTask, getTaskCollectionById, getTaskNotesForTask } from './../state/selectors/task';

import { AppState } from '../state/state';
import { FormCleanAfterMethod } from '../forms/base.form';
import { ITask } from '../state/reducers/task';
import { ITaskAssignee } from '../state/reducers/taskassignee';
import { ITaskNote } from '../state/reducers/tasknote';
import { IUser } from '../state/reducers/user';
import { Observable } from 'rxjs';
import { TaskAssigneeForm } from '../forms/task-assignee.form';
import { TaskDescriptionForm } from '../forms/task-description.form';
import { TaskNoteForm } from '../forms/task-note.form';
import { TaskTargetDateForm } from '../forms/task-target-date.form';
import { TaskTitleForm } from '../forms/task-title.form';
import { getUserState } from './../state/state';
import { take } from 'rxjs/operators';

@Component({
    selector: 'task-form, [task-form]',
    templateUrl: './task-form.component.html'
})
export class TaskFormComponent implements OnChanges {
    @Input() id: number;

    @Output() close = new EventEmitter();

    @ViewChild('modalPanel') modalPanelRef: ElementRef;

    users$: Observable<IUser[]>;
    task$: Observable<ITask>;
    taskAssignees$: Observable<ITaskAssignee[]>;
    taskNotes$: Observable<ITaskNote[]>;
    taskNoteForms = {};
    descriptionForm: TaskDescriptionForm;
    titleForm: TaskTitleForm;
    targetDateForm: TaskTargetDateForm;
    newNoteForm: TaskNoteForm;
    assigneeEditForm: TaskAssigneeForm;
    selectedClientId: number = null; 

    constructor(
        private store: Store<AppState>,
        private actionsSubject: ActionsSubject
    ) {
        this.users$ = this.store.pipe(select(getUserState));
        this.descriptionForm = new TaskDescriptionForm(this.store, this.actionsSubject);
        this.titleForm = new TaskTitleForm(this.store, this.actionsSubject);
        this.targetDateForm = new TaskTargetDateForm(this.store, this.actionsSubject);
        this.newNoteForm = new TaskNoteForm(this.store, this.actionsSubject);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (_.has(changes, 'id.currentValue')) {
            this.task$ = this.store.pipe(select(getTaskCollectionById(this.id)));
            this.taskAssignees$ = this.store.pipe(select(getTaskAssigneesForTask(this.id)));
            this.taskNotes$ = this.store.pipe(select(getTaskNotesForTask(this.id)));
            this.task$.pipe(take(1)).subscribe(
                d => {
                    this.selectedClientId = d._job.client;
                    this.descriptionForm.load(d);
                    this.titleForm.load(d);
                    this.targetDateForm.load(d);
                    this.newNoteForm.load({task: d.id});
                }
            );
        }
    }

    closeEvent(event) {
        if (this.modalPanelRef.nativeElement.contains(event.target)) {
            // inside modal - do not close
        } else {
            this.close.emit(event);
        }
    }

    getOrCreateEditNoteForm(note: ITaskNote) {
        if (!_.has(this.taskNoteForms, note.id)) {
            const form = new TaskNoteForm(
                this.store,
                this.actionsSubject,
                {alwaysEditable: false, cleanAfterMethod: FormCleanAfterMethod.loadSaved}
            );
            form.load(note);
            this.taskNoteForms[note.id] = form;
            return this.taskNoteForms[note.id];
        }
        return this.taskNoteForms[note.id];
    }

    editAssignee(assignee: ITaskAssignee) {
        this.assigneeEditForm = new TaskAssigneeForm(
            this.store,
            this.actionsSubject
        );
        this.assigneeEditForm.editable = true;
        this.assigneeEditForm.load(assignee);
    }
}
