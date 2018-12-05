import * as _ from 'lodash';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState, getRelationshipState } from './../state/state';
import {
    combineLatest,
    Observable,
    of,
    Subscription
    } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { getClientCollectionById } from '../state/selectors/client';
import { getJobCollectionById, getJobRelationshipCollectionById } from '../state/selectors/job';
import { IClient } from '../state/reducers/client';
import { IFormActionResult } from '../forms/base.form';
import { IJob } from '../state/reducers/job';
import { IJobRelationship } from '../state/reducers/jobrelationship';
import { IRelationship } from '../state/reducers/relationship';
import { IUser } from '../state/reducers/user';
import { JobRelationshipForm } from '../forms/job-relationship.form';
import { mergeMap, take } from 'rxjs/operators';
import { getActiveUsers } from '../state/selectors/user';

@Component({
    templateUrl: './job-relationship-form.component.html'
})
export class JobRelationshipFormComponent implements OnDestroy, OnInit {

    form: JobRelationshipForm;
    client: IClient;
    job: IJob;
    relationship: IJobRelationship;
    relationships$: Observable<IRelationship[]>;
    users$: Observable<IUser[]>;
    params: any;
    
    private subscriptions: Subscription[] = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private store: Store<AppState>,
        private actionsSubject: ActionsSubject
    ) { }

    ngOnInit() {
        this.relationships$ = this.store.pipe(select(getRelationshipState));
        this.users$ = this.store.pipe(select(getActiveUsers));
        
        const paramsObsv = this.route.params.pipe(
            mergeMap(
                params => combineLatest(
                    of(params),
                    this.store.pipe(select(getClientCollectionById(+params.client_id))),
                    this.store.pipe(select(getJobCollectionById(+params.job_id))),
                    this.store.pipe(select(getJobRelationshipCollectionById(+params.id)))
                )
            )
        ).subscribe(
            ([params, client, job, relationship]) => {
                this.params = params
                this.client = client;
                this.job = job;
                this.relationship = relationship;
                this.form = new JobRelationshipForm(this.store, this.actionsSubject, {alwaysEditable: true});
                if (relationship) {
                    this.form.load(relationship);
                } else if (job) {
                    this.form.load({job: job.id});
                }
                this.form.formSaved.pipe(
                    take(1)
                ).subscribe(
                    (result: IFormActionResult) => {
                        this.router.navigate(['/clients', this.params.client_id, 'jobs', this.params.job_id]);
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
