import * as fromClient from './reducers/client';
import * as fromClientContact from './reducers/clientcontact';
import * as fromFilter from './reducers/filter';
import * as fromJob from './reducers/job';
import * as fromJobStatus from './reducers/jobstatus';
import * as fromMe from './reducers/me';
import * as fromPosition from './reducers/position';
import * as fromTask from './reducers/task';
import * as fromTaskAssignee from './reducers/taskassignee';
import * as fromTaskNote from './reducers/tasknote';
import * as fromTaskStatus from './reducers/taskstatus';
import * as fromTimeDailySignoff from './reducers/timedailysignoff';
import * as fromTimeEntry from './reducers/timeentry';
import * as fromUser from './reducers/user';

import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface AppState {
    clients: fromClient.State;
    client_contacts: fromClientContact.State;
    filters: fromFilter.State;
    jobs: fromJob.State;
    job_statuses: fromJobStatus.State;
    me: fromMe.State;
    positions: fromPosition.State;
    tasks: fromTask.State;
    task_assignees: fromTaskAssignee.State;
    task_notes: fromTaskNote.State;
    task_statuses: fromTaskStatus.State;
    time_daily_signoffs: fromTimeDailySignoff.State;
    time_entries: fromTimeEntry.State;
    users: fromUser.State;
}

export const reducers: ActionReducerMap<AppState> = {
    clients: fromClient.reducer,
    client_contacts: fromClientContact.reducer,
    filters: fromFilter.reducer,
    jobs: fromJob.reducer,
    job_statuses: fromJobStatus.reducer,
    me: fromMe.reducer,
    positions: fromPosition.reducer,
    tasks: fromTask.reducer,
    task_assignees: fromTaskAssignee.reducer,
    task_notes: fromTaskNote.reducer,
    task_statuses: fromTaskStatus.reducer,
    time_daily_signoffs: fromTimeDailySignoff.reducer,
    time_entries: fromTimeEntry.reducer,
    users: fromUser.reducer
};

export const getClientState = createFeatureSelector<fromClient.State>('clients');
export const getClientContactState = createFeatureSelector<fromClientContact.State>('client_contacts');
export const getFilterState = createFeatureSelector<fromFilter.State>('filters');
export const getJobState = createFeatureSelector<fromJob.State>('jobs');
export const getJobStatusState = createFeatureSelector<fromJob.State>('job_statuses');
export const getMeState = createFeatureSelector<fromMe.State>('me');
export const getPositionState = createFeatureSelector<fromMe.State>('positions');
export const getTaskState = createFeatureSelector<fromTask.State>('tasks');
export const getTaskAssigneeState = createFeatureSelector<fromTaskAssignee.State>('task_assignees');
export const getTaskNoteState = createFeatureSelector<fromTaskNote.State>('task_notes');
export const getTaskStatusState = createFeatureSelector<fromTaskStatus.State>('task_statuses');
export const getTimeDailySignoffState = createFeatureSelector<fromTimeDailySignoff.State>('time_daily_signoffs');
export const getTimeEntryState = createFeatureSelector<fromTimeEntry.State>('time_entries');
export const getUserState = createFeatureSelector<fromUser.State>('users');
