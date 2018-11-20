import * as _ from 'lodash';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import {
    AppState,
    getBillingFrequencyState,
    getPaymentOptionState,
    getRecurringCostTypeState
    } from './../state/state';
import {
    combineLatest,
    Observable,
    of,
    Subscription
    } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { getClientCollectionById } from '../state/selectors/client';
import { getJobCollectionById, getJobRecurringCostCollectionById } from '../state/selectors/job';
import { IBillingFrequency } from '../state/reducers/billingfrequency';
import { IClient } from '../state/reducers/client';
import { IFormActionResult } from '../forms/base.form';
import { IJob } from '../state/reducers/job';
import { IJobRecurringCost } from '../state/reducers/jobrecurringcost';
import { IPaymentOption } from '../state/reducers/paymentoption';
import { IRecurringCostType } from '../state/reducers/recurringcosttype';
import { JobRecurringCostForm } from '../forms/job-recurring-cost.form';
import { mergeMap, take } from 'rxjs/operators';

@Component({
    templateUrl: './job-recurring-cost-form.component.html',
    host: {'class': 'd-flex flex-fill flex-column'}
})
export class JobRecurringCostFormComponent implements OnDestroy, OnInit {

    form: JobRecurringCostForm;
    client: IClient;
    job: IJob;
    recurringCost: IJobRecurringCost;
    billingFrequencies$: Observable<IBillingFrequency[]>;
    paymentOptions$: Observable<IPaymentOption[]>;
    recurringCostTypes$: Observable<IRecurringCostType[]>;
    params: any;
    
    private subscriptions: Subscription[] = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private store: Store<AppState>,
        private actionsSubject: ActionsSubject
    ) { }

    ngOnInit() {
        this.billingFrequencies$ = this.store.pipe(select(getBillingFrequencyState));
        this.paymentOptions$ = this.store.pipe(select(getPaymentOptionState));
        this.recurringCostTypes$ = this.store.pipe(select(getRecurringCostTypeState));
        
        const paramsObsv = this.route.params.pipe(
            mergeMap(
                params => combineLatest(
                    of(params),
                    this.store.pipe(select(getClientCollectionById(+params.client_id))),
                    this.store.pipe(select(getJobCollectionById(+params.job_id))),
                    this.store.pipe(select(getJobRecurringCostCollectionById(+params.id)))
                )
            )
        ).subscribe(
            ([params, client, job, recurringCost]) => {
                this.params = params
                this.client = client;
                this.job = job;
                this.recurringCost = recurringCost;
                this.form = new JobRecurringCostForm(this.store, this.actionsSubject, {alwaysEditable: true});
                if (recurringCost) {
                    this.form.load(recurringCost);
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
