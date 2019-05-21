import moment from 'moment';

export const fixTime = (startTime, endTime) => {
    let formatStart = moment(startTime, 'HH:mm:ss').format('hh:mm A');
    let formatEnd = moment(endTime, 'HH:mm:ss').format('hh:mm A');
    if(formatStart.charAt(0) === '0') {
        formatStart = formatStart.slice(1);
    }
    if (formatEnd.charAt(0) === '0') {
        formatEnd = formatEnd.slice(1);
    }

    return {startTime: formatStart, endTime: formatEnd};
}