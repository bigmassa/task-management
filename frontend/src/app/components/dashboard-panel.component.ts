import * as _ from 'lodash';

import { Component, Input } from '@angular/core';

@Component({
    selector: 'dashboard-panel, [dashboard-panel]',
    templateUrl: './dashboard-panel.component.html'
})
export class DashboardPanelComponent {
    @Input() description: string;

    constructor() {}
}