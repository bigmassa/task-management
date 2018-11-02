import * as _ from 'lodash';

import { AppState, getMeState } from '../state/state';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { ActivatedRoute } from '@angular/router';
import { IClient } from '../state/reducers/client';
import { IMe } from './../state/reducers/me';
import { getClientCollectionById } from '../state/selectors/client';

@Component({
    selector: 'client, [client]',
    templateUrl: './client.component.html'
})
export class ClientComponent implements OnDestroy, OnInit {

    client$: Observable<IClient>;
    me$: Observable<IMe>;

    private subscriptions: Subscription[] = [];

    constructor(
        private route: ActivatedRoute,
        private store: Store<AppState>
    ) { }

    ngOnInit() {
        const subscription = this.route.params.subscribe(
            (params) => {
                this.client$ = this.store.pipe(select(getClientCollectionById(+params.id)))
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
