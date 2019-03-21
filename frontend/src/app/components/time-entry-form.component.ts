import { ActionsSubject, Store, select } from '@ngrx/store';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { AppState } from './../state/state';
import { FormCleanAfterMethod } from '../forms/base.form';
import { ITimeEntry } from '../state/reducers/timeentry';
import { ITaskTiming } from '../state/reducers/tasktiming';
import { Observable } from 'rxjs';
import { TimeEntryForm } from '../forms/time-entry.form';
import { getTimeEntryById } from '../state/selectors/timeentry';
import { getTaskTimingsById } from '../state/selectors/task';
import { take } from 'rxjs/operators';

@Component({
    selector: 'time-entry-form, [time-entry-form]',
    templateUrl: './time-entry-form.component.html'
})
export class TimeEntryFormComponent implements OnChanges {
    
    @Input() id: number;
    @Input() newTaskId: number;

    @Output() close = new EventEmitter();
    
    entry$: Observable<ITimeEntry>;
    form: TimeEntryForm;
    timing$: Observable<ITaskTiming>

    constructor(
        private store: Store<AppState>,
        private actionsSubject: ActionsSubject
    ) {
        // setup the form
        this.form = new TimeEntryForm(this.store, this.actionsSubject);
        // close the form when saved and deleted
        this.form.formSaved.subscribe(() => this.closeEvent(null));
        this.form.formDeleted.subscribe(() => this.closeEvent(null));
    }

    ngOnChanges(changes: SimpleChanges) {
        for (const propName in changes) {
            if (propName === 'id') {
                const id = changes[propName].currentValue;

                this.entry$ = this.store.pipe(select(getTimeEntryById(id)));
                this.timing$ = this.store.pipe(select(getTaskTimingsById(id)));
                this.entry$.pipe(take(1)).subscribe(
                    d => {
                        this.form.load(d);
                    }
                );
            }
            if (propName === 'newTaskId' && changes[propName].currentValue) {
                this.form.controls.task.setValue(changes[propName].currentValue);
            }
        }
    }

    closeEvent(event) {
        this.close.emit(event);
    }

}
