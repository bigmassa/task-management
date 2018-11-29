import * as _ from 'lodash';
import * as actions from '../state/actions';
import { ActionsSubject, Store } from '@ngrx/store';
import { AppState } from '../state/state';
import { BaseForm, FormCleanAfterMethod, IFormOptions } from './base.form';
import { filter, take } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { IActionWithPayload } from '../state/models';



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

    addNew(title: string) {
        this.store.dispatch({type: actions.TagActions.ADD, payload: {name: title}});
        this.actionsSubject.pipe(
            filter((action: IActionWithPayload) => action.type == actions.TagActions.ADD_SUCCESS),
            take(1)
        ).subscribe(
            action => {
                this.controls.tag.setValue(action.payload.id)
            }
        );
    }
}
