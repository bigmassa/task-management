import * as _ from 'lodash';
import * as actions from '../state/actions';

import { ActionsSubject, Store } from '@ngrx/store';
import { BaseForm, FormCleanAfterMethod, IFormOptions } from './base.form';
import { FormControl, Validators } from '@angular/forms';
import { filter, take } from 'rxjs/operators';
import { hexReg, phoneReg, urlReg } from '../utils/regex';

import { AppState } from '../state/state';
import { IActionWithPayload } from './../state/models';

const options: IFormOptions = {
    alwaysEditable: false,
    cleanAfterMethod: FormCleanAfterMethod.loadSaved
}

export class ClientDetailForm extends BaseForm {

    controls: {
        id: FormControl
        name: FormControl
        colour: FormControl
        phone_number: FormControl
        email_address: FormControl
        website: FormControl
        address: FormControl
        notes: FormControl
    };
    createAction = actions.ClientActions.ADD;
    createSuccessAction = actions.ClientActions.ADD_SUCCESS;
    updateAction = actions.ClientActions.UPDATE;
    updateSuccessAction = actions.ClientActions.UPDATE_SUCCESS;

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
                name: new FormControl('', Validators.required),
                colour: new FormControl('', [Validators.required, Validators.pattern(hexReg)]),
                phone_number: new FormControl(null, Validators.pattern(phoneReg)),
                email_address: new FormControl(null, Validators.email),
                website: new FormControl(null, Validators.pattern(urlReg)),
                address: new FormControl(null),
                notes: new FormControl(null)
            },
            null,
            null,
            _.assign({}, options, formOptions)
        );
    }
}
