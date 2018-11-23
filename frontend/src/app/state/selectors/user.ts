import * as _ from 'lodash';

import { createSelector } from '@ngrx/store';
import { getUserState } from '../state';

export const getActiveUsers = createSelector(
  getUserState,
  (users) => _.filter(users, ['is_active', true])
);

export const getUserById = (id) => createSelector(
  getUserState,
  (users) => _.find(users, ['id', id])
);
