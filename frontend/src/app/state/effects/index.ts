import { ClientContactEffects } from './clientcontact';
import { ClientEffects } from './client';
import { DataEffects } from './data';
import { JobEffects } from './job';
import { JobStatusEffects } from './jobstatus';
import { MeEffects } from './me';
import { PositionEffects } from './position';
import { TaskAssigneeEffects } from './taskassignee';
import { TaskEffects } from './task';
import { TaskNoteEffects } from './tasknote';
import { TaskStatusEffects } from './taskstatus';
import { TimeDailySignoffEffects } from './timedailysignoff';
import { TimeEntryEffects } from './timeentry';
import { UserEffects } from './user';

export const effects = [
    ClientContactEffects,
    ClientEffects,
    DataEffects,
    JobEffects,
    JobStatusEffects,
    MeEffects,
    PositionEffects,
    TaskEffects,
    TaskAssigneeEffects,
    TaskNoteEffects,
    TaskStatusEffects,
    TimeDailySignoffEffects,
    TimeEntryEffects,
    UserEffects
];
