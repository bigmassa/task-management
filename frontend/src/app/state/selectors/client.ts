import * as _ from 'lodash';

import { createSelector } from '@ngrx/store';
import { getClientState } from '../state';

export const getClientCollection = createSelector(
    getClientState,
    (clients) => _.orderBy(clients, ['name'], ['asc'])
);

export const getClientCollectionById = (id) => createSelector(
    getClientCollection,
    (clients) => _.find(clients, ['id', id])
);
