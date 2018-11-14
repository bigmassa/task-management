import * as _ from 'lodash';
import * as actions from '../state/actions';

import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { filter, flatMap } from 'rxjs/operators';

import { AppState } from '../state/state';
import { DeletableService } from '../services/deletable';
import { IClient } from './../state/reducers/client';
import { Subscription } from 'rxjs';
import { getClientCollectionById } from '../state/selectors/client';

@Component({
    templateUrl: './client-delete.component.html',
    host: {'class': 'd-flex flex-fill flex-column'}
})
export class ClientDeleteComponent implements OnDestroy, OnInit {

    canDelete: boolean;
    client: IClient;
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
            flatMap(params => this.store.pipe(select(getClientCollectionById(+params.id))))
        ).subscribe(
            client => {
                if (!client) { return; }
                this.client = client;
                this.deletable.check(DeletableService.CLIENT, this.client.id).then(check => this.canDelete = check);
            }
        );
        this.subscriptions.push(subscription);
    }

    ngOnDestroy() {
        _.each(this.subscriptions, s => s.unsubscribe());
    }

    delete() {
        this.store.dispatch({type: actions.ClientActions.REMOVE, payload: this.client});
        this.router.navigate(['/clients']);
    }
}
