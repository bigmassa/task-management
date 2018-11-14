import * as _ from 'lodash';
import * as actions from '../state/actions';

import { ActionsSubject, Store } from '@ngrx/store';
import { BaseForm, FormCleanAfterMethod, IFormOptions } from './base.form';
import { FormControl, Validators } from '@angular/forms';
import { decimal10at2, hexReg } from '../utils/regex';

import { AppState } from '../state/state';

const options: IFormOptions = {
    alwaysEditable: false,
    cleanAfterMethod: FormCleanAfterMethod.loadSaved
}

export class JobDetailForm extends BaseForm {

    controls: {
        id: FormControl
        title: FormControl
        description: FormControl
        client: FormControl
        type: FormControl
        estimated_hours: FormControl
        colour: FormControl
        status: FormControl
        billed_to: FormControl
    };
    createAction = actions.JobActions.ADD;
    createSuccessAction = actions.JobActions.ADD_SUCCESS;
    updateAction = actions.JobActions.UPDATE;
    updateSuccessAction = actions.JobActions.UPDATE_SUCCESS;

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
                title: new FormControl('', Validators.required),
                description: new FormControl(null),
                client: new FormControl('', Validators.required),
                type: new FormControl('', Validators.required),
                estimated_hours: new FormControl(null, Validators.pattern(decimal10at2)),
                colour: new FormControl('', [Validators.required, Validators.pattern(hexReg)]),
                status: new FormControl('', Validators.required),
                billed_to: new FormControl(null),
            },
            null,
            null,
            _.assign({}, options, formOptions)
        );
    }

    prepareValueForDispatch() {
        // the api doesnt like empty strings for a date field
        if (this.controls.billed_to.value === '') {
            this.controls.billed_to.setValue(null);
        }
    }
}
