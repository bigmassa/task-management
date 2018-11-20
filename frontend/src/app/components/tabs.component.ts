import * as _ from 'lodash';
import * as actions from '../state/actions';
import { AppState } from '../state/state';
import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output
    } from '@angular/core';
import { ITab } from '../state/reducers/tabs';
import { Store } from '@ngrx/store';

@Component({
    selector: '[tabs]',
    template: `
    <li [class.active]="tab.active" (click)="activate(tab)" *ngFor="let tab of tabs$">{{ tab.title }}</li>
    `
})
export class TabsComponent implements OnChanges {
    @Input('tabs') tabs$: ITab[];
    @Input() type: string;

    @Output() activeTab: EventEmitter<ITab> = new EventEmitter<ITab>();

    constructor(private store: Store<AppState>) { }

    ngOnChanges() {
        if (this.tabs$) {
            const active = _.find(this.tabs$, ['active', true]);
            if (active) {
                this.activeTab.emit(active);
            }
        }
    }
    
    activate(payload: ITab) {
        switch (this.type) {

            case 'client':
                this.store.dispatch({type: actions.TabActions.CLIENT_ACTIVATE_TAB, payload});
                break;

            case 'job':
                this.store.dispatch({type: actions.TabActions.JOB_ACTIVATE_TAB, payload});
                break;

            default:
                break;
        }

        this.activeTab.emit(payload);
    }

}

