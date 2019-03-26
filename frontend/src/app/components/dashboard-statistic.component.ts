import * as _ from 'lodash';

import { Component, Input } from '@angular/core';

@Component({
    selector: 'dashboard-statistic, [dashboard-statistic]',
    templateUrl: './dashboard-statistic.component.html'
})
export class DashboardStatisticComponent {
    @Input() icon: string;
    @Input() colour: string;
    @Input() statistic: string;
    @Input() description: string;

    constructor() {}
}