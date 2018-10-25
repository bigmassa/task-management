import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { AppState } from '../state/state';
import { IClient } from './../state/reducers/client';
import { Observable } from 'rxjs';
import { getClientState } from './../state/state';

@Component({
    selector: 'client-list, [client-list]',
    templateUrl: './client-list.component.html',
    host: {'class': 'd-flex flex-fill flex-column'}
})
export class ClientListComponent implements OnInit {

    searchTerms: string[] = [];
    clients$: Observable<IClient[]>;

    constructor(private store: Store<AppState>) { }

    ngOnInit() {
        this.clients$ = this.store.pipe(select(getClientState))
    }
}
