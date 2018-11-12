import * as _ from 'lodash';

import { createSelector } from '@ngrx/store';
import { getTagState } from './../state';

export const getTagCollection = createSelector(
    getTagState,
    (tags) => _.orderBy(tags, ['name'], ['asc'])
);

export const getTagById = (id) => createSelector(
    getTagCollection,
    (tags) => _.find(tags, ['id', id])
);
