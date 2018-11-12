import * as _ from 'lodash';
import * as actions from '../state/actions';

import { ActionsSubject, Store } from '@ngrx/store';
import { BaseForm, FormCleanAfterMethod, IFormOptions } from './base.form';
import { FormControl, Validators } from '@angular/forms';

import { AppState } from '../state/state';

const options: IFormOptions = {
    alwaysEditable: false,
    cleanAfterMethod: FormCleanAfterMethod.loadSaved
}

export class TaskTagForm extends BaseForm {

    controls: {
        id: FormControl
        object_id: FormControl
        tag: FormControl
    };
    createAction = actions.TaskTagActions.ADD;
    createSuccessAction = actions.TaskTagActions.ADD_SUCCESS;
    updateAction = actions.TaskTagActions.UPDATE;
    updateSuccessAction = actions.TaskTagActions.UPDATE_SUCCESS;
    deleteAction = actions.TaskTagActions.REMOVE;
    deleteSuccessAction = actions.TaskTagActions.REMOVE_SUCCESS;

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
                object_id: new FormControl(null, Validators.required),
                tag: new FormControl(null, Validators.required)
            },
            null,
            null,
            _.assign({}, options, formOptions)
        );
    }
}
