import * as _ from 'lodash';
import * as moment from 'moment';

import { createSelector } from '@ngrx/store';
import { getTimeEntryState } from '../state';

export const getTimeEntryById = (id) => createSelector(
    getTimeEntryState,
    (entries) => _.find(entries, ['id', id])
);

export const getTimeEntriesForUserAndDay = (date: Date, id: number) => createSelector(
    getTimeEntryState,
    (entries) => _.filter(
            entries,
            e => e.user === id && moment(e.started_at).format('YYYY-MM-DD') === moment(date).format('YYYY-MM-DD')
    )
);
