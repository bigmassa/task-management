import * as _ from 'lodash';

import { getClientContactState, getClientState, getPositionState } from '../state';

import { createSelector } from '@ngrx/store';
import { getClientContactTagState } from './../state';

export const getClientCollection = createSelector(
    getClientState,
    (clients) => _.orderBy(clients, ['name'], ['asc'])
);

export const getClientCollectionById = (id) => createSelector(
    getClientCollection,
    (clients) => _.find(clients, ['id', id])
);

export const getClientContactCollection = createSelector(
    getClientContactState,
    getPositionState,
    getClientContactTagState,
    (contacts, positions, tags) => {
        const objects = _.map(contacts, (contact) => {
            return _.assign({}, contact, {
                _position: _.find(positions, ['id', contact.position]),
                _tags: _.filter(tags, ['object_id', contact.id])
            });
        });
        return _.orderBy(objects, ['first_name', 'last_name'], ['asc', 'asc']);
    }
);

export const getClientContactCollectionById = (id) => createSelector(
    getClientContactCollection,
    (contacts) => _.find(contacts, ['id', id])
);

export const getClientContactCollectionForClient = (id) => createSelector(
    getClientContactCollection,
    (contacts) => _.filter(contacts, ['client', id])
);
