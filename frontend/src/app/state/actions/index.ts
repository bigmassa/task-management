import { ClientActions } from './client';
import { ClientContactActions } from './clientcontact';
import { DataActions } from './data';
import { FilterActions } from './filters';
import { HttpActions } from './http';
import { JobActions } from './job';
import { JobStatusActions } from './jobstatus';
import { MeActions } from './me';
import { PositionActions } from './position';
import { TaskActions } from './task';
import { TaskAssigneeActions } from './taskassignee';
import { TaskNoteActions } from './tasknote';
import { TaskStatusActions } from './taskstatus';
import { TimeDailySignoffActions } from './timedailysignoff';
import { TimeEntryActions } from './timeentry';
import { UserActions } from './user';

export {
    ClientActions,
    ClientContactActions,
    DataActions,
    FilterActions,
    HttpActions,
    JobActions,
    JobStatusActions,
    MeActions,
    PositionActions,
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
    ClientContactActions,
    DataActions,
    FilterActions,
    HttpActions,
    JobActions,
    JobStatusActions,
    MeActions,
    PositionActions,
    TaskActions,
    TaskAssigneeActions,
    TaskNoteActions,
    TaskStatusActions,
    TimeDailySignoffActions,
    TimeEntryActions,
    UserActions
];
