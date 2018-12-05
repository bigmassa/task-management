import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { AppState } from '../state/state';
import { IClient } from './../state/reducers/client';
import { Observable } from 'rxjs';
import { getClientState } from './../state/state';

@Component({
    templateUrl: './client-list.component.html'
})
export class ClientListComponent implements OnInit {

    searchTerms: string[] = [];
    clients$: Observable<IClient[]>;

    constructor(private store: Store<AppState>) { }

    ngOnInit() {
        this.clients$ = this.store.pipe(select(getClientState))
    }
}
