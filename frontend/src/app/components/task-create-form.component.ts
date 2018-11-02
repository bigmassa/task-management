import * as _ from 'lodash';

import { ActionsSubject, Store, select } from '@ngrx/store';
import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { getClientState, getJobState, getUserState } from './../state/state';

import { AppState } from '../state/state';
import { IClient } from '../state/reducers/client';
import { IFormActionResult } from '../forms/base.form';
import { IJob } from '../state/reducers/job';
import { IUser } from '../state/reducers/user';
import { Observable } from 'rxjs';
import { TaskCreateForm } from '../forms/task-create.form';
import { getJobCollectionById } from '../state/selectors/job';

@Component({
    selector: 'task-create-form, [task-create-form]',
    templateUrl: './task-create-form.component.html'
})
export class TaskCreateFormComponent {
    @Input() opened = false;
    @Input() jobId: number;
    @Input() statusId: number;
    
    @Output() close = new EventEmitter();
    @Output() saved = new EventEmitter();

    @ViewChild('modalPanel') modalPanelRef: ElementRef;

    job$: Observable<IJob>;
    users$: Observable<IUser[]>;
    form: TaskCreateForm;
    selectedClientId: number = null; 

    constructor(
        private store: Store<AppState>,
        private actionsSubject: ActionsSubject
    ) {
        this.users$ = this.store.pipe(select(getUserState));
        this.form = new TaskCreateForm(this.store, this.actionsSubject);
    }

    ngOnChanges(changes: SimpleChanges) {
        this.job$ = this.store.pipe(select(getJobCollectionById(this.jobId)));
        this.form.patchValue({status: this.statusId, job: this.jobId});
        this.form.formSaved.subscribe(
            (e: IFormActionResult) => {
                this.close.emit(e.event);
                this.saved.emit(e.payload);
            }
        );
    }

    closeEvent(event) {
        if (this.modalPanelRef.nativeElement.contains(event.target)) {
            // inside modal - do not close
        } else {
            this.close.emit(event);
        }
    }
}
