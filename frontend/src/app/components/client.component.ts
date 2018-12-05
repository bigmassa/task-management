import * as _ from 'lodash';
import * as actions from '../state/actions';
import { ActivatedRoute } from '@angular/router';
import { AppState, getMeState, getTabState } from '../state/state';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { getClientCollectionById, getClientContactCollectionForClient } from '../state/selectors/client';
import { getJobCollectionForClient } from '../state/selectors/job';
import { IClient } from '../state/reducers/client';
import { IClientContact } from '../state/reducers/clientcontact';
import { IJob } from './../state/reducers/job';
import { IMakeCall } from '../state/models';
import { IMe } from './../state/reducers/me';
import { ITab, ITabs } from '../state/reducers/tabs';
import { Observable, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';



@Component({
    templateUrl: './client.component.html'
})
export class ClientComponent implements OnDestroy, OnInit {

    client$: Observable<IClient>;
    contacts$: Observable<IClientContact[]>;
    jobs$: Observable<IJob[]>;
    me$: Observable<IMe>;
    tabs$: Observable<ITabs>;
    openSearchTerms: string[] = [];
    closedSearchTerms: string[] = [];
    selectedTab: ITab;
    openOrderBy: string = 'id';
    openOrderType: string = 'asc';
    closedOrderBy: string = 'id';
    closedOrderType: string = 'asc';

    private subscriptions: Subscription[] = [];

    constructor(
        private route: ActivatedRoute,
        private store: Store<AppState>
    ) { }

    ngOnInit() {
        const subscription = this.route.params.subscribe(
            (params) => {
                this.client$ = this.store.pipe(select(getClientCollectionById(+params.id)));
                this.contacts$ = this.store.pipe(select(getClientContactCollectionForClient(+params.id)));
                this.jobs$ = this.store.pipe(select(getJobCollectionForClient(+params.id)));
            }
        );
        this.subscriptions.push(subscription);
        // data subscriptions
        this.tabs$ = this.store.pipe(select(getTabState));
        this.me$ = this.store.pipe(select(getMeState));
    }

    ngOnDestroy() {
        _.each(this.subscriptions, s => s.unsubscribe());
    }

    call(number: string) {
        const payload: IMakeCall = {telephone_number: number};
        this.store.dispatch({type: actions.MakeCallActions.MAKE_CALL, payload})
    }

    orderOpenJobs(by: string) {
        if (by != this.openOrderBy) {
            this.openOrderType = 'asc';
        } else {
            this.openOrderType = this.openOrderType == 'asc' ? 'desc' : 'asc';
        }
        this.openOrderBy = by;
    }

    orderClosedJobs(by: string) {
        if (by != this.closedOrderBy) {
            this.closedOrderType = 'asc';
        } else {
            this.closedOrderType = this.closedOrderType == 'asc' ? 'desc' : 'asc';
        }
        this.closedOrderBy = by;
    }
}
