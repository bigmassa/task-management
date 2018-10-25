import * as _ from 'lodash';

import { createSelector } from '@ngrx/store';
import { getTimeEntryState } from '../state';

export const getTimeEntryById = (id) => createSelector(
    getTimeEntryState,
    (entries) => _.find(entries, ['id', id])
);
