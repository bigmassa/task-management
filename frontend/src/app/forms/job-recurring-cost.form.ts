import * as _ from 'lodash';
import * as actions from '../state/actions';
import { ActionsSubject, Store } from '@ngrx/store';
import { AppState } from '../state/state';
import { BaseForm, FormCleanAfterMethod, IFormOptions } from './base.form';
import { FormControl, Validators } from '@angular/forms';
import { integerReg } from '../utils/regex';

const options: IFormOptions = {
    alwaysEditable: true,
    cleanAfterMethod: FormCleanAfterMethod.loadSaved
}

export class JobRecurringCostForm extends BaseForm {

    controls: {
        id: FormControl
        job: FormControl
        type: FormControl
        last_invoiced_date: FormControl
        billing_interval: FormControl
        billing_frequency: FormControl
        payment_option: FormControl
    };
    createAction = actions.JobRecurringCostActions.ADD;
    createSuccessAction = actions.JobRecurringCostActions.ADD_SUCCESS;
    updateAction = actions.JobRecurringCostActions.UPDATE;
    updateSuccessAction = actions.JobRecurringCostActions.UPDATE_SUCCESS;
    deleteAction = actions.JobRecurringCostActions.REMOVE;
    deleteSuccessAction = actions.JobRecurringCostActions.REMOVE_SUCCESS;

    constructor(
        protected store: Store<AppState>,
        protected actionsSubject: ActionsSubject,
        formOptions?: IFormOptions
    ) {
        super(
            store,
            actionsSubject,
            {
                id: new FormControl(null),
                job: new FormControl(null, Validators.required),
                type: new FormControl(null, Validators.required),
                last_invoiced_date: new FormControl(null),
                billing_interval: new FormControl(null, [Validators.required, Validators.pattern(integerReg)]),
                billing_frequency: new FormControl(null, Validators.required),
                payment_option: new FormControl(null, Validators.required)
            },
            null,
            null,
            _.assign({}, options, formOptions)
        );
    }

    getValuePayload() {
        return _.assign({}, this.value, {
            last_invoiced_date: this.value.last_invoiced_date instanceof Date ? this.value.last_invoiced_date.toISOString().slice(0, 10) : this.value.last_invoiced_date
        })
    }
}
