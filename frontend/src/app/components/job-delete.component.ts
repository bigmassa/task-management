import * as _ from 'lodash';
import * as actions from '../state/actions';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from '../state/state';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeletableService } from '../services/deletable';
import { filter, flatMap } from 'rxjs/operators';
import { getJobCollectionById } from '../state/selectors/job';
import { IJob } from '../state/reducers/job';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: './job-delete.component.html',
    host: {'class': 'd-flex flex-fill flex-column'}
})
export class JobDeleteComponent implements OnDestroy, OnInit {

    canDelete: boolean;
    job: IJob;
    private subscriptions: Subscription[] = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private store: Store<AppState>,
        private deletable: DeletableService
    ) { }

    ngOnInit() {
        const subscription = this.route.params.pipe(
            filter(params => _.get(params, 'id')),
            flatMap(params => this.store.pipe(select(getJobCollectionById(+params.id))))
        ).subscribe(
            job => {
                if (!job) { return; }
                this.job = job;
                this.deletable.check(DeletableService.JOB, this.job.id).then(check => this.canDelete = check);
            }
        );
        this.subscriptions.push(subscription);
    }

    ngOnDestroy() {
        _.each(this.subscriptions, s => s.unsubscribe());
    }

    delete() {
        this.store.dispatch({type: actions.JobActions.REMOVE, payload: this.job});
        this.router.navigate(['/clients', this.job.client]);
    }
}
