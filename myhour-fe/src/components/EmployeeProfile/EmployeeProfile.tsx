import React, {useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import { GlobalStateContext } from '../../Stores/GlobalStore';
import Nav from '../Navigation/Nav';
import avatar from '../../assets/avatar.png';
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import DeleteEmployee from '../Delete/DeleteEmployee';
import DatePicker from 'react-datepicker';
import moment from 'moment';


const EmployeeProfile = observer((props:any) => {
    
    const state = useContext(GlobalStateContext);

    const [deletingUser, setDeletingUser] = useState(false);
    const [addingShift, setAddingShift] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const ID = props.match.params.UserID;
        state.getEmployee(ID);
        state.getShifts(ID);  
        setLoading(false);
        
    }, [])

    return (
        <div>
            {deletingUser ?
                <DeleteEmployee Employee={{'Name': state.currEmployee.Name, 'UserID': state.currEmployee.UserID}} setDeletingUser={setDeletingUser}/>
                : ''
            }
            <Nav/>
            {!loading ?
            <div className="employeeContentWrapper">
                <div className="employeeProfileContent">
                    <div className="profileHeader">
                        <h2>Employee Profile</h2>
                    </div>
                    <div className="profileContent">
                        <img src={avatar}/>
                        <div className="profileTextContent">
                            <span>Employee ID: </span>
                            <p>{state.currEmployee.EmployeeID}</p>
                            <span>Name: </span>
                            <p>{state.currEmployee.Name}</p>
                            <span>Position: </span>
                            <p>{state.currEmployee.Position}</p>
                            <div className="profileButtons">
                                <div onClick={() => { setDeletingUser(true)}} className="trash">
                                    <FontAwesomeIcon className="trash" icon={faTrash}/>
                                </div>
                                <button>Message</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="employeeShiftContent">
                    <div className="shiftListHeader">
                        <h2>Shifts</h2>
                        <div onClick={() => { setAddingShift(true)}} className='createShift'>
                            <span className='createPlus'>+ </span>
                            <span className='createContent'>Add Shift</span>
                        </div>  
                    </div>
                    {addingShift ? 
                        <div className="addShiftWrapper">
                            <div className="shiftDataSelect Date">
                                <p>Date: </p>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(val) => {
                                        setStartDate(val);
                                    }}
                                />
                            </div>
                            <div className="shiftDataSelect Time">
                                <p>Start Time:</p>
                                <DatePicker
                                    selected={startTime}
                                    onChange={(val) => {
                                        setStartTime(val);
                                    }}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    dateFormat="h:mm aa"
                                    timeCaption="Time"
                                />
                            </div>
                            <div className="shiftDataSelect Time">
                                <p>End Time:</p>
                                <DatePicker
                                    selected={endTime}
                                    onChange={(val) => {
                                        setEndTime(val);
                                    }}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    dateFormat="h:mm aa"
                                    timeCaption="Time"
                                />
                            </div>
                            <div className="addShiftButtons">
                                    <button onClick={() => {
                                        state.addShift(state.currEmployee.UserID, startDate.toISOString(), startTime.toISOString(), endTime.toISOString())
                                    }}className="green">Confirm</button>
                                    <button onClick={() => { setAddingShift(false)}} className="red">Cancel</button>
                            </div>
                        </div>
                        : null
                        }
                    <div className="shiftListContent">
                        {state.currShifts.map(shift => {
                            console.log(shift.endTime);
                            return (
                                <div>
                                    <p>Date: {shift.shiftDate.split(" ")[0]}</p>
                                    <p>Start Time: {moment(shift.startTime, 'HH:mm:ss').format('hh:mm a')}</p>
                                    <p>End Time: {moment(shift.endTime, 'HH:mm:ss').format('hh:mm a')}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            : null}
        </div>
    )
});

export default EmployeeProfile;
import "react-datepicker/dist/react-datepicker.css";
import { stat } from 'fs';
