import * as _ from 'lodash';

import { ActionsSubject, Store, select } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, combineLatest, of, Observable } from 'rxjs';
import { getClientCollectionById, getClientContactCollectionById } from '../state/selectors/client';
import { mergeMap, take } from 'rxjs/operators';

import { AppState, getPositionState } from '../state/state';
import { ClientContactForm } from './../forms/client-contact.form';
import { IClient } from './../state/reducers/client';
import { IClientContact } from './../state/reducers/clientcontact';
import { IFormActionResult } from '../forms/base.form';
import { IPosition } from '../state/reducers/position';

@Component({
    templateUrl: './client-contact-form.component.html'
})
export class ClientContactFormComponent implements OnDestroy, OnInit {

    client: IClient;
    contact: IClientContact;
    form: ClientContactForm;
    params: any;
    positions$: Observable<IPosition[]>;
    private subscriptions: Subscription[] = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private store: Store<AppState>,
        private actionsSubject: ActionsSubject
    ) {
        this.positions$ = store.pipe(select(getPositionState));
        this.form = new ClientContactForm(this.store, this.actionsSubject, {alwaysEditable: true});
    }

    ngOnInit() {
        const paramsObsv = this.route.params.pipe(
            mergeMap(
                params => combineLatest(
                    of(params),
                    this.store.pipe(select(getClientCollectionById(+params.client_id))),
                    this.store.pipe(select(getClientContactCollectionById(+params.id)))
                )
            )
        ).subscribe(
            ([params, client, contact]) => {
                this.params = params
                this.client = client;
                this.contact = contact;
                if (contact) {
                    this.form.load(this.contact);
                } else if (client) {
                    this.form.load({client: client.id});
                }
                this.form.formSaved.pipe(
                    take(1)
                ).subscribe(
                    (result: IFormActionResult) => {
                        this.router.navigate(['/clients', this.params.client_id]);
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
