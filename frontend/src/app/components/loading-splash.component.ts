import { AppState, getHttpState } from '../state/state';
import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Globals } from '../services/globals';

@Component({
    selector: 'loading-splash',
    templateUrl: './loading-splash.component.html'
})
export class LoadingSplashComponent implements OnInit {

    show: boolean = true;
    pendingRequests: number = 0;

    constructor(private store: Store<AppState>) { }

    ngOnInit() {
        this.store.pipe(select(getHttpState)).subscribe(
            (data) => {
                this.pendingRequests = data.pendingRequests;
                if (this.pendingRequests > 1) {
                    // only show if we have more than x number of concurrent requests
                    this.show = true;
                } else if (this.pendingRequests == 0) {
                    // and hide when we have none
                    this.show = false;
                }
            }
        );
    }
}
