import moment from 'moment';

export const fixTime = (startTime, endTime) => {
    let formatStart = moment(startTime, 'HH:mm:ss').format('h:mm A');
    let formatEnd = moment(endTime, 'HH:mm:ss').format('h:mm A');

    return {startTime: formatStart, endTime: formatEnd};
}