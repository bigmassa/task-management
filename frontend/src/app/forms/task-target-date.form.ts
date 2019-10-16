import * as _ from 'lodash';
import * as actions from '../state/actions';
import { ActionsSubject, Store } from '@ngrx/store';
import { AppState } from '../state/state';
import { BaseForm, FormCleanAfterMethod, IFormOptions } from './base.form';
import { FormControl } from '@angular/forms';

const options: IFormOptions = {
    alwaysEditable: true,
    cleanAfterMethod: FormCleanAfterMethod.loadSaved
}

export class TaskTargetDateForm extends BaseForm {

    controls: {
        id: FormControl
        target_date: FormControl
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
                target_date: new FormControl(null)
            },
            null,
            null,
            _.assign({}, options, formOptions)
        );
    }

    getValuePayload() {
        return _.assign({}, this.value, {
            target_date: this.value.target_date ? this.value.target_date.toISOString().slice(0, 10) : this.value.target_date
        })
    }
}
