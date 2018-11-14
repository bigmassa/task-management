import * as _ from 'lodash';

import { ActionsSubject, Store, select } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState, getJobStatusState, getJobTypeState } from './../state/state';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, combineLatest, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

import { IClient } from '../state/reducers/client';
import { IFormActionResult } from '../forms/base.form';
import { IJob } from '../state/reducers/job';
import { IJobStatus } from './../state/reducers/jobstatus';
import { IJobType } from '../state/reducers/jobtype';
import { JobDetailForm } from '../forms/job-detail.form';
import { getClientCollectionById } from '../state/selectors/client';
import { getJobCollectionById } from '../state/selectors/job';

@Component({
    templateUrl: './job-detail-form.component.html',
    host: {'class': 'd-flex flex-fill flex-column'}
})
export class JobDetailFormComponent implements OnDestroy, OnInit {

    form: JobDetailForm;
    client: IClient;
    job: IJob;
    jobStatuses$: Observable<IJobStatus[]>;
    jobTypes$: Observable<IJobType[]>;
    params: any;
    
    private subscriptions: Subscription[] = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private store: Store<AppState>,
        private actionsSubject: ActionsSubject
    ) { }

    ngOnInit() {
        this.jobStatuses$ = this.store.pipe(select(getJobStatusState));
        this.jobTypes$ = this.store.pipe(select(getJobTypeState));
        
        const paramsObsv = this.route.params.pipe(
            mergeMap(
                params => combineLatest(
                    of(params),
                    this.store.pipe(select(getClientCollectionById(+params.client_id))),
                    this.store.pipe(select(getJobCollectionById(+params.id)))
                )
            )
        ).subscribe(
            ([params, client, job]) => {
                this.params = params
                this.client = client;
                this.job = job;
                this.form = new JobDetailForm(this.store, this.actionsSubject, {alwaysEditable: true});
                if (job) {
                    this.form.load(this.job);
                } else if (client) {
                    this.form.load({client: client.id, colour: client.colour});
                }
                this.form.formSaved.pipe(
                    take(1)
                ).subscribe(
                    (result: IFormActionResult) => {
                        this.router.navigate(['/clients', this.params.client_id, 'jobs', result.payload.id]);
                    }
                )
            }
        )
        this.subscriptions.push(paramsObsv);
    }

    ngOnDestroy() {
        _.each(this.subscriptions, s => s.unsubscribe());
    }

}
