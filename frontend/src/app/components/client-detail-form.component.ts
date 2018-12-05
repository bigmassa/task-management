import * as _ from 'lodash';

import { ActionsSubject, Store, select } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, flatMap, take } from 'rxjs/operators';

import { AppState } from '../state/state';
import { ClientDetailForm } from '../forms/client-detail.form';
import { IClient } from './../state/reducers/client';
import { IFormActionResult } from '../forms/base.form';
import { Subscription } from 'rxjs';
import { getClientCollectionById } from '../state/selectors/client';

@Component({
    templateUrl: './client-detail-form.component.html'
})
export class ClientDetailFormComponent implements OnDestroy, OnInit {

    client: IClient;
    form: ClientDetailForm;
    private subscriptions: Subscription[] = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private store: Store<AppState>,
        private actionsSubject: ActionsSubject
    ) { }

    ngOnInit() {
        const existingClient = this.route.params.pipe(
            filter(params => _.get(params, 'id')),
            flatMap(params => this.store.pipe(select(getClientCollectionById(+params.id))))
        ).subscribe(
            client => {
                if (!client) { return; }
                this.client = client;
                this.form = new ClientDetailForm(this.store, this.actionsSubject, {alwaysEditable: true});
                this.form.load(this.client);
                this.form.formSaved.pipe(take(1)).subscribe(
                    (result: IFormActionResult) => {
                        this.router.navigate(['/clients', result.payload.id])
                    }
                )
            }
        );
        this.subscriptions.push(existingClient);
        
        const newClient = this.route.params.subscribe(
            params => {
                if (params.id) { return; }
                this.form = new ClientDetailForm(this.store, this.actionsSubject, {alwaysEditable: true});
                this.form.formSaved.pipe(take(1)).subscribe(
                    (result: IFormActionResult) => {
                        this.router.navigate(['/clients', result.payload.id])
                    }
                )
            }
        );
        this.subscriptions.push(newClient);
    }

    ngOnDestroy() {
        _.each(this.subscriptions, s => s.unsubscribe());
    }

}
