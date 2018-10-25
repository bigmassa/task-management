import * as moment from 'moment';

export const getDatesBetween = (from: Date, to: Date) => {
    const dateArray = [];
    let currentDate = moment(from);
    const stopDate = moment(to);
    while (currentDate <= stopDate) {
        dateArray.push( moment(currentDate).toDate() )
        currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
}

export const valueOr = (value: any, ifNull: any = '') => {
    return value ? value : ifNull;
};