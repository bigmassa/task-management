import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { AppState, getMeState, getTabState } from '../state/state';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { getClientCollectionById, getClientContactCollectionForClient } from '../state/selectors/client';
import { getJobCollectionForClient } from '../state/selectors/job';
import { IClient } from '../state/reducers/client';
import { IClientContact } from '../state/reducers/clientcontact';
import { IJob } from './../state/reducers/job';
import { IMe } from './../state/reducers/me';
import { ITab, ITabs } from '../state/reducers/tabs';
import { Observable, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';



@Component({
    selector: 'client, [client]',
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

}