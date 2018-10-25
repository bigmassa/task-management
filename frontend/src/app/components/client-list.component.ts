import { AppState } from '../state/state';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
    selector: 'client-list, [client-list]',
    templateUrl: './client-list.component.html',
    host: {'class': 'd-flex flex-fill flex-column'}
})
export class ClientListComponent {

    constructor(private store: Store<AppState>) { }

}
