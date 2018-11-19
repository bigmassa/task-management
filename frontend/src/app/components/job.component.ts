import * as _ from 'lodash';
import * as actions from '../state/actions';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../state/state';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { FormCleanAfterMethod } from '../forms/base.form';
import { getCookie } from '../utils/cookies';
import {
    getJobCollectionById,
    getJobFilesForJob,
    getJobNoteCollectionForJob,
    getJobRecurringCostCollectionForJob,
    getJobRelationshipCollectionForJob
    } from '../state/selectors/job';
import { getTaskCollectionForJob } from '../state/selectors/task';
import { getTaskStatusState } from './../state/state';
import { IJob } from '../state/reducers/job';
import { IJobFile } from '../state/reducers/jobfile';
import { IJobNote } from './../state/reducers/jobnote';
import { IJobRecurringCost } from './../state/reducers/jobrecurringcost';
import { IJobRelationship } from './../state/reducers/jobrelationship';
import { ITask } from '../state/reducers/task';
import { ITaskStatus } from '../state/reducers/taskstatus';
import { JobNoteForm } from '../forms/job-note.form';
import { Observable, Subscription } from 'rxjs';



@Component({
    selector: 'job, [job]',
    templateUrl: './job.component.html',
    host: {'class': 'd-flex flex-fill flex-column'}
})
export class JobComponent implements OnDestroy, OnInit {

    dropzoneConfig: DropzoneConfigInterface = {
        url: '/api/job-files/',
        maxFilesize: 50,
        headers: { 'X-CSRFTOKEN': getCookie('csrftoken') }
    };
    jobId: number;
    createFormOpen = false;
    createFormStatusId: number;
    files$: Observable<IJobFile[]>;
    job$: Observable<IJob>;
    notes$: Observable<IJobNote[]>;
    jobNoteForms = {};
    newNoteForm: JobNoteForm;
    recurringCosts$: Observable<IJobRecurringCost[]>;
    relationships$: Observable<IJobRelationship[]>;
    selectedTab: string = 'detail';
    selectedTaskId: number = null;
    statuses$: Observable<ITaskStatus[]>;
    tasks$: Observable<ITask[]>;

    private subscriptions: Subscription[] = [];

    constructor(
        private route: ActivatedRoute,
        private store: Store<AppState>,
        private actionsSubject: ActionsSubject
    ) { }

    ngOnInit() {
        this.statuses$ = this.store.pipe(select(getTaskStatusState));

        const subscription = this.route.params.subscribe(
            (params) => {
                this.jobId = +params.id;
                // data
                this.files$ = this.store.pipe(select(getJobFilesForJob(this.jobId)));
                this.job$ = this.store.pipe(select(getJobCollectionById(this.jobId)));
                this.notes$ = this.store.pipe(select(getJobNoteCollectionForJob(this.jobId)));
                this.recurringCosts$ = this.store.pipe(select(getJobRecurringCostCollectionForJob(this.jobId)));
                this.relationships$ = this.store.pipe(select(getJobRelationshipCollectionForJob(this.jobId)));
                this.tasks$ = this.store.pipe(select(getTaskCollectionForJob(this.jobId)), debounceTime(200));
                // forms
                this.newNoteForm = new JobNoteForm(
                    this.store,
                    this.actionsSubject,
                    {cleanAfterMethod: FormCleanAfterMethod.resetToInitial}
                );
                this.newNoteForm.load({job: this.jobId});
            }
        );
        this.subscriptions.push(subscription);
    }

    ngOnDestroy() {
        _.each(this.subscriptions, s => s.unsubscribe());
    }

    // tasks

    droppedIntoColumn(status: ITaskStatus, tasks: ITask[]) {
        if (_.isEmpty(tasks)) {
            return;
        }
        // ensure their status is correct
        _.each(tasks, (task, i) => {
            if (task.status != status.id) {
                const payload = {id: task.id, status: status.id, order: i+1};
                this.store.dispatch({type: actions.TaskActions.PATCH, payload});
            }
        });
        // sort all tasks for this status
        // use a timeout to ensure the api gets a chance to update the status
        // as the data can come back with the original status
        let sortData = { id: tasks[0].job, tasks: _.map(tasks, 'id') };
        setTimeout(() => this.store.dispatch({type: actions.JobActions.SORT_TASKS, payload: sortData}), 100)
    }

    openCreateForm(status: ITaskStatus) {
        this.createFormStatusId = status.id;
        this.createFormOpen = true;
    }

    // files
    
    onFileSending(event: any) {
        event[2].set('job', this.jobId);
    }

    onFileSuccess(event: any) {
        const payload = event[1];
        this.store.dispatch({type: actions.JobFileActions.LOAD_ONE_SUCCESS, payload});
    }

    deleteFile(payload: IJobFile) {
        this.store.dispatch({type: actions.JobFileActions.REMOVE, payload});
    }

    // notes

    getOrCreateEditNoteForm(note: IJobNote) {
        if (_.has(this.jobNoteForms, note.id)) {
            return this.jobNoteForms[note.id];
        }
        const form = new JobNoteForm(
            this.store,
            this.actionsSubject,
            {alwaysEditable: false, cleanAfterMethod: FormCleanAfterMethod.loadSaved}
        );
        form.load(note);
        this.jobNoteForms[note.id] = form;
        return this.jobNoteForms[note.id];
    }

    // relationships

    deleteRelationship(event: Event, payload: IJobRelationship) {
        event.stopPropagation();
        this.store.dispatch({type: actions.JobRelationshipActions.REMOVE, payload});
    }

}
