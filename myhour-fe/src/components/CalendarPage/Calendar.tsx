import React, {useContext, useState} from 'react';
import {observer} from 'mobx-react-lite';
import { GlobalStateContext } from '../../Stores/GlobalStore';
import dateFns from "date-fns";
import './Calendar.css'
import { Link } from 'react-router-dom';
import Nav from '../Navigation/Nav';

const Calendar = observer(() => {
    
    const state = useContext(GlobalStateContext);

    //Would need to make an api call to get data for this month, and everytime the arrow key is clicked
    const tempData = {
        1: {
            count: 2
        },
        2: {
            count: 6
        },
        3: {
            count: 10
        },
        15: {
            count:4
        },
        12: {
            count:8
        },
        17: {
            count:8
        },
        18: {
            count:3
        },
        20: {
            count:1
        },
        28: {
            count:8
        },
        27: {
            count: 1
        }
    }

    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const renderHead = ()  =>{
        const dateFormat = "MMMM YYYY";
        return (
            <div className="header row flex-middle">
            <div className="col col-start">
                <div className="icon" onClick={() => {
                    calendarArrowHandler('prev')
                }}>
                chevron_left
                </div>
            </div>
            <div className="col col-center">
                <span>
                {dateFns.format(currentMonth, dateFormat)}
                </span>
            </div>
            <div className="col col-end" onClick={() => {
                calendarArrowHandler('next')
            }}>
                <div className="icon">chevron_right</div>
            </div>
            </div>
        );
    }

    const renderDays = () => {
        const dateFormat = "dddd";
        const days = [];
        let startDate = dateFns.startOfWeek(currentMonth);
        for (let i = 0; i < 7; i++) {
            days.push(
            <div className="col col-center" key={i}>
                {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
            </div>
            );
        }
        return <div className="days row">{days}</div>;
    }

    const renderCells = ()  => {
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);

        const dateFormat = "D";
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = dateFns.format(day, dateFormat);
                const cloneDay = day;
                days.push(
                    (dateFns.isSameMonth(day, monthStart) ?
                    <Link className='col cell' to={{ pathname: "/Schedule/Requests", search: `?date=${day}`}}>
                        <div
                            className={`cell ${
                            !dateFns.isSameMonth(day, monthStart)
                                ? "disabled"
                                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
                            } ${
                                (dateFns.getDate(day) in tempData) ? 
                                    (tempData[dateFns.getDate(day)].count <= 3 ? 'greenCell' : 
                                        tempData[dateFns.getDate(day)].count <= 6 ? 'orangeCell' : 'redCell') : ''
                            }`}
                            key={`${day}`}
                            onClick={() => onDateClick(dateFns.parse(cloneDay))}
                        >
                            <span className="number">{formattedDate}</span>
                            <span className="bg">{formattedDate}</span>
                        </div>
                    </Link>
                    :
                    <div
                        className={`col cell ${
                        !dateFns.isSameMonth(day, monthStart)
                            ? "disabled"
                            : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
                        } ${
                            (dateFns.getDate(day) in tempData) ? 
                                (tempData[dateFns.getDate(day)].count <= 3 ? 'greenCell' : 
                                    tempData[dateFns.getDate(day)].count <= 6 ? 'orangeCell' : 'redCell') : ''
                        }`}
                        key={`${day}`}
                        onClick={() => onDateClick(dateFns.parse(cloneDay))}
                    >
                        <span className="number">{formattedDate}</span>
                        <span className="bg">{formattedDate}</span>
                    </div>
                    )
                );
                day = dateFns.addDays(day, 1);
            }
            rows.push(
                <div className="row" key={`${day}`}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="body">{rows}</div>;
    }   

    const onDateClick = (day : any) => {
        setSelectedDate(day);
    }

    const calendarArrowHandler = (type : string) => {
        if(type === 'next') {
            setCurrentMonth(dateFns.addMonths(currentMonth, 1));
        } else {
            setCurrentMonth(dateFns.subMonths(currentMonth, 1));
        }
    }


    return (
        <div>
            <Nav/>
            <div className="calendar">
                {renderHead()}
                {renderDays()}
                {renderCells()}
            </div>
        </div>
    )
});

export default Calendar;