import * as _ from 'lodash';
import * as actions from '../state/actions';
import { ActionsSubject, Store } from '@ngrx/store';
import { AppState } from '../state/state';
import { BaseForm, FormCleanAfterMethod, IFormOptions } from './base.form';
import { filter, take } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { IActionWithPayload } from './../state/models';



const options: IFormOptions = {
    alwaysEditable: false,
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

    prepareValueForDispatch() {
        // the api doesnt like empty strings for a date field
        if (this.controls.target_date.value === '') {
            this.controls.target_date.setValue(null);
        }
    }
}
