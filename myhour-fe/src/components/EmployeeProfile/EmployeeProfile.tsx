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


const EmployeeProfile = observer((props:any) => {
    
    const state = useContext(GlobalStateContext);

    const [deletingUser, setDeletingUser] = useState(false);
    const [addingShift, setAddingShift] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());

    console.log(startDate.toISOString());
    console.log(startTime.toISOString());
    console.log();
    return (
        <div>
            {deletingUser ?
                <DeleteEmployee setDeletingUser={setDeletingUser}/>
                : ''
            }
            <Nav/>
            <div className="employeeContentWrapper">
                <div className="employeeProfileContent">
                    <div className="profileHeader">
                        <h2>Employee Profile</h2>
                    </div>
                    <div className="profileContent">
                        <img src={avatar}/>
                        <div className="profileTextContent">
                            <span>Employee ID: </span>
                            <p>{state.targetEmployee.employeeID}</p>
                            <span>Name: </span>
                            <p>{state.targetEmployee.Name}</p>
                            <span>Position: </span>
                            <p>{state.targetEmployee.Position}</p>
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
                                        state.addShift(startDate.toISOString(), startTime.toISOString(), endTime.toISOString())
                                    }}className="green">Confirm</button>
                                    <button onClick={() => { setAddingShift(false)}} className="red">Cancel</button>
                            </div>
                        </div>
                        : null
                        }
                    <div className="shiftListContent">

                    </div>
                </div>
            </div>
        </div>
    )
});

export default EmployeeProfile;
import "react-datepicker/dist/react-datepicker.css";