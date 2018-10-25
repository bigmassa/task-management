import * as _ from 'lodash';
import * as moment from 'moment';

import { getTimeDailySignoffState, getTimeEntryState } from './../state';

import { createSelector } from '@ngrx/store';
import { getTaskCollection } from './task';
import { valueOr } from '../../utils/generic';

export const getEventsForUser = (id: number) => createSelector(
    getTimeEntryState,
    getTaskCollection,
    (entries, tasks) => {
        const objs = _.filter(entries, ['user', id]);
        return _.map(objs, (obj) => {
            const _task = _.find(tasks, ['id', obj.task]);
            return {
                id: obj.id.toString(),
                start: new Date(obj.started_at),
                end: new Date(obj.ended_at),
                title: _.get(_task, '_job.title', '') + ' - ' + _.get(_task, 'title', ''),
                backgroundColor: _.get(_task, '_job.colour', ''),
                borderColor: _.get(_task, '_job.colour', ''),
                textColor: '#000',
                allDay: false,
                extendedProps: {
                    id: obj.id,
                    task: obj.task 
                }
            };
        });
    }
);

export const getTasksForUser = (id: number = null, searchTerms: string[] = []) => createSelector(
    getTaskCollection,
    (tasks) => {
        let objs = tasks;
        
        // apply filters (either search all or only show tasks im assigned to)
        if (searchTerms.length > 0) {
            objs = _.filter(objs, obj => {
                let found = true;
                _.each(searchTerms, (term) => {
                    if (!_.includes(valueOr(obj.title).toLowerCase(), term) &&
                        !_.includes(valueOr(obj._job.title).toLowerCase(), term) &&
                        !_.includes(valueOr(obj._job._client.name).toLowerCase(), term)
                    ) {
                        found = false;
                    }
                });
                return found;
            });
        } else if (id) {
            objs = _.filter(objs, { _assignees: [{'user': id}] });
        }

        // group the tasks by client
        const autoShow = searchTerms.length > 0;
        const byClient = _.groupBy(objs, '_job._client.name');
        const byClientByJob = {};

        // then for each client group the tasks by job
        _.forEach(byClient, (tasks, key) => {
            const byJob = _.groupBy(tasks, '_job.title');
            byClientByJob[key] = {
                visible: autoShow,
                jobs: _.transform(
                    byJob, (result, value, key) => result[key] = {
                        visible: autoShow,
                        tasks: value
                    }
                )
            }
        })
        
        return byClientByJob;
    }
)

export const getDailyTimeSignoffForUser = (id: number, date: Date) => createSelector(
    getTimeDailySignoffState,
    (signoffs) => _.find(signoffs, e => e.user == id && moment(e.date).date() == moment(date).date())
)

export const getDailyTimeTotalForUser = (id: number, date: Date) => createSelector(
    getTimeEntryState,
    (entries) => {
        const forDay = _.filter(entries, e => e.user == id && moment(e.started_at).date() == moment(date).date());
        const durations: string[] = _.map(forDay, 'duration');
        const totalDurations = durations.slice(1).reduce((prev, cur) => moment.duration(cur).add(prev), moment.duration(durations[0]));
        return moment.utc(totalDurations.asMilliseconds()).format("HH:mm");
    }
)