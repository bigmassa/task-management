import { ClientActions } from './client';
import { DataActions } from './data';
import { FilterActions } from './filters';
import { HttpActions } from './http';
import { JobActions } from './job';
import { MeActions } from './me';
import { TaskActions } from './task';
import { TaskAssigneeActions } from './taskassignee';
import { TaskNoteActions } from './tasknote';
import { TaskStatusActions } from './taskstatus';
import { TimeDailySignoffActions } from './timedailysignoff';
import { TimeEntryActions } from './timeentry';
import { UserActions } from './user';

export {
    ClientActions,
    DataActions,
    FilterActions,
    HttpActions,
    JobActions,
    MeActions,
    TaskActions,
    TaskAssigneeActions,
    TaskNoteActions,
    TaskStatusActions,
    TimeDailySignoffActions,
    TimeEntryActions,
    UserActions
};

export const actions = [
    ClientActions,
    DataActions,
    FilterActions,
    HttpActions,
    JobActions,
    MeActions,
    TaskActions,
    TaskAssigneeActions,
    TaskNoteActions,
    TaskStatusActions,
    TimeDailySignoffActions,
    TimeEntryActions,
    UserActions
];
