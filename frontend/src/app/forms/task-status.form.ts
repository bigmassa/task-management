import * as _ from 'lodash';
import { take } from 'rxjs/operators';

import { FormControl, Validators } from '@angular/forms';
import { ActionsSubject, select, Store } from '@ngrx/store';

import * as actions from '../state/actions';
import { getTaskStateForJob } from '../state/selectors/task';
import { AppState } from '../state/state';
import { calculateOrder } from '../utils/task';
import { BaseForm, FormCleanAfterMethod, IFormOptions } from './base.form';

const options: IFormOptions = {
    alwaysEditable: true,
    cleanAfterMethod: FormCleanAfterMethod.loadSaved
}

export class TaskStatusForm extends BaseForm {

    controls: {
        id: FormControl
        status: FormControl,
        order: FormControl
    };
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
                status: new FormControl('', Validators.required),
                order: new FormControl(null, Validators.required)
            },
            null,
            null,
            _.assign({}, options, formOptions)
        );
    }

    async prepareValueForDispatch() {
        return this.store.pipe(
            select(getTaskStateForJob(this.initialData.job)),
            take(1)
        ).toPromise().then(
            tasks => {
                tasks = _.filter(tasks, ['status', this.value.status]);
                tasks = [this.value, ...tasks];
                const order = calculateOrder(0, tasks);
                this.controls.order.setValue(order);
            }
        )
    }
    
    async save(event: Event) {
        // save the form data
        event.stopPropagation();
        
        if (!this.valid) {
            // set the controls to touched so we can display the errors
            _.forEach(this.controls, (c, k) => {
                this.controls[k].markAsTouched();
                this.controls[k].updateValueAndValidity();
            });
            // just return out
            return;
        }
        
        await this.prepareValueForDispatch();

        this.store.dispatch({ type: this.updateAction, payload: this.getValuePayload() });
        
        // wait for the result
        this.waitForResult(event);

    }
}
