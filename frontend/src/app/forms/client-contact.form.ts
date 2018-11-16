import * as _ from 'lodash';
import * as actions from '../state/actions';

import { ActionsSubject, Store } from '@ngrx/store';
import { BaseForm, FormCleanAfterMethod, IFormOptions } from './base.form';
import { FormControl, Validators } from '@angular/forms';

import { AppState } from '../state/state';
import { phoneReg } from '../utils/regex';

const options: IFormOptions = {
    alwaysEditable: false,
    cleanAfterMethod: FormCleanAfterMethod.loadSaved
}

export class ClientContactForm extends BaseForm {

    controls: {
        id: FormControl
        client: FormControl
        first_name: FormControl
        last_name: FormControl
        phone_number: FormControl
        mobile_number: FormControl
        email_address: FormControl
        address: FormControl
        position: FormControl
        notes: FormControl
    };
    createAction = actions.ClientContactActions.ADD;
    createSuccessAction = actions.ClientContactActions.ADD_SUCCESS;
    updateAction = actions.ClientContactActions.UPDATE;
    updateSuccessAction = actions.ClientContactActions.UPDATE_SUCCESS;

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
                client: new FormControl(null, Validators.required),
                first_name: new FormControl(null, Validators.required),
                last_name: new FormControl(null, Validators.required),
                phone_number: new FormControl(null, Validators.pattern(phoneReg)),
                mobile_number: new FormControl(null),
                email_address: new FormControl(null, Validators.email),
                address: new FormControl(null),
                position: new FormControl(null),
                notes: new FormControl(null),
            },
            null,
            null,
            _.assign({}, options, formOptions)
        );
    }
}
