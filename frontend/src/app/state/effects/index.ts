import { BillingFrequencyEffects } from './billingfrequency';
import { ClientContactEffects } from './clientcontact';
import { ClientEffects } from './client';
import { DataEffects } from './data';
import { JobEffects } from './job';
import { JobFileEffects } from './jobfile';
import { JobNoteEffects } from './jobnote';
import { JobRecurringCostEffects } from './jobrecurringcost';
import { JobRelationshipEffects } from './jobrelationship';
import { JobStatusEffects } from './jobstatus';
import { JobTypeEffects } from './jobtype';
import { MeEffects } from './me';
import { PaymentOptionEffects } from './paymentoption';
import { PositionEffects } from './position';
import { RecurringCostTypeEffects } from './recurringcosttype';
import { RelationshipEffects } from './relationship';
import { TaskAssigneeEffects } from './taskassignee';
import { TaskEffects } from './task';
import { TaskNoteEffects } from './tasknote';
import { TaskStatusEffects } from './taskstatus';
import { TimeEntryEffects } from './timeentry';
import { UserEffects } from './user';

export const effects = [
    BillingFrequencyEffects,
    ClientContactEffects,
    ClientEffects,
    DataEffects,
    JobEffects,
    JobFileEffects,
    JobNoteEffects,
    JobRecurringCostEffects,
    JobRelationshipEffects,
    JobStatusEffects,
    JobTypeEffects,
    MeEffects,
    PaymentOptionEffects,
    PositionEffects,
    RecurringCostTypeEffects,
    RelationshipEffects,
    TaskEffects,
    TaskAssigneeEffects,
    TaskNoteEffects,
    TaskStatusEffects,
    TimeEntryEffects,
    UserEffects
];
