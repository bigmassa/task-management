import * as _ from 'lodash';
import * as actions from '../state/actions';

import { ActionsSubject, Store } from '@ngrx/store';
import { BaseForm, FormCleanAfterMethod, IFormOptions } from './base.form';
import { FormControl, Validators } from '@angular/forms';

import { AppState } from '../state/state';

const options: IFormOptions = {
    alwaysEditable: true,
    cleanAfterMethod: FormCleanAfterMethod.loadSaved
}

export class JobNoteForm extends BaseForm {

    controls: {
        id: FormControl
        job: FormControl
        note: FormControl
    };
    createAction = actions.JobNoteActions.ADD;
    createSuccessAction = actions.JobNoteActions.ADD_SUCCESS;
    updateAction = actions.JobNoteActions.UPDATE;
    updateSuccessAction = actions.JobNoteActions.UPDATE_SUCCESS;
    deleteAction = actions.JobNoteActions.REMOVE;
    deleteSuccessAction = actions.JobNoteActions.REMOVE_SUCCESS;

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
                note: new FormControl('', Validators.required)
            },
            null,
            null,
            _.assign({}, options, formOptions)
        );
    }
}
