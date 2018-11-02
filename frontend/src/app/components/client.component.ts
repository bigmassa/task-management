import * as _ from 'lodash';

import { AppState, getMeState } from '../state/state';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { getClientCollectionById, getClientContactCollectionForClient } from '../state/selectors/client';

import { ActivatedRoute } from '@angular/router';
import { IClient } from '../state/reducers/client';
import { IClientContact } from '../state/reducers/clientcontact';
import { IJob } from './../state/reducers/job';
import { IMe } from './../state/reducers/me';
import { getJobCollectionForClient } from '../state/selectors/job';

@Component({
    selector: 'client, [client]',
    templateUrl: './client.component.html'
})
export class ClientComponent implements OnDestroy, OnInit {

    client$: Observable<IClient>;
    contacts$: Observable<IClientContact[]>;
    jobs$: Observable<IJob[]>;
    openSearchTerms: string[] = [];
    closedSearchTerms: string[] = [];
    me$: Observable<IMe>;
    selectedTab: string = 'detail';
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
        this.me$ = this.store.pipe(select(getMeState));
    }

    ngOnDestroy() {
        _.each(this.subscriptions, s => s.unsubscribe());
    }

}
