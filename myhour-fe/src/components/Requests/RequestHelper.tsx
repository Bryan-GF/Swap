// Functional package imports
import moment from 'moment';

// Helper function, takes in two time values as parameters and returns object of correctly formatted time values.
export const fixTime = (startTime, endTime) => {
    let formatStart = moment(startTime, 'HH:mm:ss').format('h:mm A');
    let formatEnd = moment(endTime, 'HH:mm:ss').format('h:mm A');

    return {startTime: formatStart, endTime: formatEnd};
}