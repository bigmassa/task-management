import * as _ from 'lodash';
import * as actions from '../state/actions';
import { ActionsSubject, Store } from '@ngrx/store';
import { AppState } from '../state/state';
import { BaseForm, FormCleanAfterMethod, IFormOptions } from './base.form';
import { FormControl, Validators } from '@angular/forms';

const options: IFormOptions = {
    alwaysEditable: true,
    cleanAfterMethod: FormCleanAfterMethod.loadSaved
}

export class JobRelationshipForm extends BaseForm {

    controls: {
        id: FormControl
        job: FormControl
        user: FormControl
        relationship: FormControl
    };
    createAction = actions.JobRelationshipActions.ADD;
    createSuccessAction = actions.JobRelationshipActions.ADD_SUCCESS;
    updateAction = actions.JobRelationshipActions.UPDATE;
    updateSuccessAction = actions.JobRelationshipActions.UPDATE_SUCCESS;
    deleteAction = actions.JobRelationshipActions.REMOVE;
    deleteSuccessAction = actions.JobRelationshipActions.REMOVE_SUCCESS;

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
                user: new FormControl(null, Validators.required),
                relationship: new FormControl(null, Validators.required)
            },
            null,
            null,
            _.assign({}, options, formOptions)
        );
    }
}
