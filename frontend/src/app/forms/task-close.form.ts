import * as _ from 'lodash';

import { FormControl, Validators } from '@angular/forms';
import { ActionsSubject, Store } from '@ngrx/store';

import * as actions from '../state/actions';
import { AppState } from '../state/state';
import { BaseForm, FormCleanAfterMethod, IFormOptions } from './base.form';

const options: IFormOptions = {
    alwaysEditable: false,
    cleanAfterMethod: FormCleanAfterMethod.loadSaved
}

export class TaskClosedForm extends BaseForm {

    controls: {
        id: FormControl
        closed: FormControl
    };
    createAction = actions.TaskActions.ADD;
    createSuccessAction = actions.TaskActions.ADD_SUCCESS;
    updateAction = actions.TaskActions.PATCH;
    updateSuccessAction = actions.TaskActions.PATCH_SUCCESS;

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
                closed: new FormControl('', Validators.required)
            },
            null,
            null,
            _.assign({}, options, formOptions)
        );
    }
}
