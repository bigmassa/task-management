import * as actions from '../state/actions';
import * as moment from 'moment';

import { ActionsSubject, Store, select } from '@ngrx/store';
import { CalendarOptions, DatesRenderInfo, DropInfo, EventClickInfo, EventDropInfo, EventObject, EventResizeInfo, ViewSkeletonRenderInfo } from './calendar.component';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { getEventsForUser, getTasksForUser } from '../state/selectors/timesheet';
import { getMeState, getUserState } from './../state/state';

import { AppState } from '../state/state';
import { IUser } from '../state/reducers/user';
import { getDatesBetween } from './../utils/generic';

@Component({
    selector: 'time-sheet, [time-sheet]',
    templateUrl: './time-sheet.component.html',
    host: {'class': 'd-flex flex-fill flex-column'}
})
export class TimesheetComponent implements OnInit {

    events$: Observable<EventObject[]>;
    currentUpdateRequest: Subscription;
    options: CalendarOptions;
    searchTerms: string[] = [];
    selectedEventId: number;
    selectedTaskId: number;
    selectedUserId: number;
    subscriptions: Subscription[] = [];
    tasks$: Observable<any>;
    users$: Observable<IUser[]>;
    viewAxisWidth: number;
    viewDates: any[] = [];

    constructor(
        private store: Store<AppState>,
        private actionsSubject: ActionsSubject
    ) { }
    
    ngOnInit() {
        this.store.pipe(select(getMeState)).subscribe(me => {
            this.selectedUserId = me.id;
            this.refetchData();
        });

        this.options = {
            defaultView: 'agendaWeek',
            header: {
                left: 'agendaDay,agendaWeek',
                center: 'title',
                right:  'today prev,next'
            },
            height: 'parent',
            firstDay: 1,
            allDaySlot: false,
            nowIndicator: true,
            slotEventOverlap: false,
            slotDuration: '00:05:00',
            snapDuration: '00:01:00',
            defaultTimedEventDuration: '00:05:00',
            scrollTime: moment().format('HH:00:00'),
            editable: true,
            dragRevertDuration: 0,
            droppable: true,
            eventOverlap: false
        };
    }

    refetchData() {
        this.users$ = this.store.pipe(select(getUserState));
        this.tasks$ = this.store.pipe(select(getTasksForUser(this.selectedUserId, this.searchTerms)))
        this.events$ = this.store.pipe(select(getEventsForUser(this.selectedUserId)));
    }

    changeTask(task: number) {
        if (this.selectedEventId) {
            this.selectedTaskId = task;
        }
    }

    onViewSkeletonRender(info: ViewSkeletonRenderInfo) {
        setTimeout(() => {
            this.viewAxisWidth = info.view.axisWidth;
        });
    }

    onDatesRender(info: DatesRenderInfo) {
        setTimeout(() => {
            this.viewDates = getDatesBetween(info.view.activeStart, moment(info.view.activeEnd).add(-1, "days").toDate())
        });
    }

    onDrop(info: DropInfo) {
        const payload: any = {
            user: this.selectedUserId,
            task: info.draggedEl.dataset.task,
            started_at: moment(info.date).toISOString(),
            ended_at: moment(info.date).add(5, 'minutes').toISOString()
        }
        this.store.dispatch({type: actions.TimeEntryActions.ADD, payload});
    }

    onEventDrop(info: EventDropInfo) {
        const payload: any = {
            id: info.event.extendedProps.id,
            started_at: moment(info.event.start).toISOString(),
            ended_at: moment(info.event.end).toISOString()
        }
        this.updateEvent(info, payload);
    }

    onEventResize(info: EventResizeInfo) {
        const payload: any = {
            id: info.event.extendedProps.id,
            started_at: moment(info.event.start).toISOString(),
            ended_at: moment(info.event.end).toISOString()
        }
        this.updateEvent(info, payload);
    }

    onEventClick(info: EventClickInfo) {
        this.selectedEventId = info.event.extendedProps.id;
    }

    private updateEvent(info: any, payload: any) {
        // if there is a current subscription stop it
        if (this.currentUpdateRequest) { this.currentUpdateRequest.unsubscribe(); }
        // update the entry
        this.store.dispatch({type: actions.TimeEntryActions.PATCH, payload});
        // if there is an http error revert it
        this.currentUpdateRequest = this.actionsSubject.pipe(
            filter((a: any) => a.type === actions.HttpActions.HTTP_ERROR && a.payload.data.id === payload.id),
            take(1)
        ).subscribe(
            () => info.revert()
        );
    }
}
