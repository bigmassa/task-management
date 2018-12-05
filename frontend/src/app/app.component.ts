import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Globals } from './services/globals';
import * as actions from './state/actions';
import { IMe } from './state/reducers/me';
import { AppState, getMeState } from './state/state';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    me$: Observable<IMe>;

    constructor(
        public globals: Globals,
        public store: Store<AppState>
    ) { }

    ngOnInit() {
        this.me$ = this.store.pipe(select(getMeState))
        this.store.dispatch({ type: actions.DataActions.LOAD_DATA });
        this.store.dispatch({ type: actions.SocketActions.START });
    }

}
