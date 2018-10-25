import { AppState, getMeState } from './state/state';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Globals } from './services/globals';
import { IMe } from './state/reducers/me';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    host: {'class': 'd-flex flex-fill flex-column'}
})
export class AppComponent implements OnInit {

    me$: Observable<IMe>;

    constructor(
        public globals: Globals,
        public store: Store<AppState>
    ) { }

    ngOnInit() {
        this.me$ = this.store.pipe(select(getMeState))
    }

}
