import * as _ from 'lodash';
import * as actions from '../state/actions';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { AppState, getTabState } from '../state/state';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { FormCleanAfterMethod } from '../forms/base.form';
import { getCookie } from '../utils/cookies';
import {
    getJobCollectionById,
    getJobFilesForJob,
    getJobNoteCollectionForJob,
    getJobRecurringCostCollectionForJob,
    getJobRelationshipCollectionForJob,
    getJobTimingsById
    } from '../state/selectors/job';
import { getTaskStateForJob } from '../state/selectors/task';
import { getTaskStatusState } from './../state/state';
import { IJob } from '../state/reducers/job';
import { IJobFile } from '../state/reducers/jobfile';
import { IJobNote } from './../state/reducers/jobnote';
import { IJobRecurringCost } from './../state/reducers/jobrecurringcost';
import { IJobRelationship } from './../state/reducers/jobrelationship';
import { IJobTiming } from '../state/reducers/jobtiming';
import { ITab, ITabs } from '../state/reducers/tabs';
import { ITask } from '../state/reducers/task';
import { ITaskStatus } from '../state/reducers/taskstatus';
import { JobNoteForm } from '../forms/job-note.form';
import { Observable, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { IActionWithPayload } from '../state/models';

@Component({
    templateUrl: './job.component.html'
})
export class JobComponent implements OnDestroy, OnInit {

    dropzoneConfig: DropzoneConfigInterface = {
        url: '/api/job-files/',
        maxFilesize: 50,
        headers: { 'X-CSRFTOKEN': getCookie('csrftoken') }
    };
    jobId: number;
    files$: Observable<IJobFile[]>;
    job$: Observable<IJob>;
    notes$: Observable<IJobNote[]>;
    tabs$: Observable<ITabs>;
    timings$: Observable<IJobTiming>;
    jobNoteForms = {};
    newNoteForm: JobNoteForm;
    recurringCosts$: Observable<IJobRecurringCost[]>;
    relationships$: Observable<IJobRelationship[]>;
    selectedTab: ITab;
    selectedTaskId: number = null;
    statuses$: Observable<ITaskStatus[]>;
    tasks$: Observable<ITask[]>;

    private subscriptions: Subscription[] = [];

    constructor(
        private route: ActivatedRoute,
        private store: Store<AppState>,
        private actionsSubject: ActionsSubject
    ) {
        this.newNoteForm = new JobNoteForm(
            this.store,
            this.actionsSubject,
            {cleanAfterMethod: FormCleanAfterMethod.resetToInitial}
        );
    }

    ngOnInit() {
        this.tabs$ = this.store.pipe(select(getTabState));
        this.statuses$ = this.store.pipe(select(getTaskStatusState));

        const paramsSub = this.route.params.subscribe(
            (params) => {
                this.jobId = +params.id;
                // data
                this.files$ = this.store.pipe(select(getJobFilesForJob(this.jobId)));
                this.job$ = this.store.pipe(select(getJobCollectionById(this.jobId)));
                this.notes$ = this.store.pipe(select(getJobNoteCollectionForJob(this.jobId)));
                this.recurringCosts$ = this.store.pipe(select(getJobRecurringCostCollectionForJob(this.jobId)));
                this.relationships$ = this.store.pipe(select(getJobRelationshipCollectionForJob(this.jobId)));
                this.tasks$ = this.store.pipe(select(getTaskStateForJob(this.jobId)));
                this.timings$ = this.store.pipe(select(getJobTimingsById(this.jobId)));
                // forms
                this.newNoteForm.load({job: this.jobId});
            }
        );
        this.subscriptions.push(paramsSub);

        const querySub = this.route.queryParams.subscribe(
            params => {
                if (params['task']) {
                    this.activateTabAndOpenTask(+params['task']);
                }
            }
        );
        this.subscriptions.push(querySub);
    }

    ngOnDestroy() {
        _.each(this.subscriptions, s => s.unsubscribe());
    }

    // tasks

    activateTabAndOpenTask(id: number) {
        this.store.dispatch({type: actions.TabActions.JOB_ACTIVATE_TAB, payload: {title: 'Tasks'}});
        this.selectedTaskId = id;
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

    downloadFile(payload: IJobFile) {
        this.store.dispatch({type: actions.JobFileActions.LOAD_ONE, payload: payload.id});
        this.actionsSubject.pipe(
            filter((action: IActionWithPayload) => action.type === actions.JobFileActions.LOAD_ONE_SUCCESS),
            take(1)
        ).subscribe(action => window.open(action.payload.file, "_blank"));
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

    // recurring costs

    deleteRecurringCost(event: Event, payload: IJobRecurringCost) {
        event.stopPropagation();
        this.store.dispatch({type: actions.JobRecurringCostActions.REMOVE, payload});
    }

}
