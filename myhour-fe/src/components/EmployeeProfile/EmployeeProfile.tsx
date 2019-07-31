// Global State
import { GlobalStateContext } from '../../Stores/GlobalStore';

// Functional package imports
import React, {useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Chatkit from '@pusher/chatkit-client';

// Design
import avatar from '../../assets/avatar.png';
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPen, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

// Components
import Nav from '../Navigation/Nav';
import DeleteEmployee from '../Delete/DeleteEmployee';

// Components displays employee information along with a list of their shifts. Managers can
// delete employees and add/modify/delete shifts here.
const EmployeeProfile = observer((props:any) => {
    
    const state = useContext(GlobalStateContext);

    // Time Handlers
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [startEditDate, setEditStartDate] = useState(new Date());
    const [startEditTime, setEditStartTime] = useState(new Date());
    const [endEditTime, setEditEndTime] = useState(new Date());

    // Popup Hanlders
    const [deletingShift, setDeletingShift] = useState(false);
    const [deletingUser, setDeletingUser] = useState(false);
    const [addingShift, setAddingShift] = useState(false);

    // Target Handlers
    const [currDelete, setCurrDelete] = useState(null);
    const [editActive, setEditActive] = useState({active: false, target: null});

    const [loading, setLoading] = useState(true);
    

    // Attempts to edit shift values through global state editShift function. Takes in the target
    // shift ID and Version. Success edits global state currShifts array to have updated values.
    const handleEditShift = async(ShiftID, Version) => {
  
        let finalDate = new Date(startEditDate.getFullYear(), startEditDate.getMonth(), startEditDate.getDate(), startEditTime.getHours(), startEditTime.getMinutes(), startEditTime.getSeconds());
        
        let status = await state.editShift(ShiftID, startEditDate.toISOString(), timeEditHelper(startEditTime), timeEditHelper(endEditTime), Version, moment.utc(finalDate).format('YYYY-MM-DD hh:mm:ss'));
        if(status) {
            state.setCurrShifts(state.currShifts.map((shift, i) => {
                if(shift.ShiftID === ShiftID) {
                    return {...shift, startTime:  moment(startEditTime, 'HH:mm:ss').format('h:mm A'), endTime:  moment(endEditTime, 'HH:mm:ss').format('h:mm A')}
                } else {
                    return shift;
                }
            }));      
        }
        
    }

    // Attempt to delete employee shift through global state function deleteShift. Success filters out
    // old shift out of global state currShifts array. Switches deletingShift state value to 
    // false, getting rid of popup.
    const handleShiftDelete = async() => {
        const status = await state.deleteShift(currDelete);
        if(status) {
            state.setCurrShifts(state.currShifts.filter((shift) =>
            shift.ShiftID != currDelete));
            
        }
        setDeletingShift(false);
    }

    // Attempts to add employee shift through global state function addShift. Success adds
    // shift to the global state currShifts array. Switches addingShift state value to false,
    // getting rid of popup.
    const handleAddShift = async () => {
        setAddingShift(false);

        let finalDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startTime.getHours(), startTime.getMinutes(), startTime.getSeconds());

        const result = await state.addShift(state.currEmployee.UserID, timeEditHelper(startDate), timeEditHelper(startTime), timeEditHelper(endTime), moment.utc(finalDate).format('YYYY-MM-DD hh:mm:ss'));
        if(result) {
            state.setCurrShifts([...state.currShifts, {
                ShiftID: `${result}`,
                shiftDate: moment(startDate).format('MM/DD/YYYY').substring(1),
                startTime: moment(startTime, 'HH:mm:ss').format('h:mm A'),
                endTime: moment(endTime, 'HH:mm:ss').format('h:mm A')
            }]);
        }  
    }

    const createConversation = () => {
        state.currChatter.createRoom({
            name: state.userData.Firstname + ", " + state.currEmployee.Name,
            private: true,
            addUserIds: [state.currEmployee.email, state.userData.email]
        }).then(room => {
            props.history.push('/Conversations');
        }).catch(err => {
            console.log(`Error creating room ${err}`);
        })
    }

    // Takes in time value when editing shift and converts it into the correct timezone.
    const timeEditHelper = (time) => {
        let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        return (new Date(time - tzoffset)).toISOString().slice(0, -1);
    }


    // On component did mount, gets employees profile and shift information.
    useEffect(() => {
        const ID = props.match.params.UserID;
        state.getEmployee(ID);
        state.getShifts(ID);  
        setLoading(false);
        
    }, [])
    
    return (
        <div>
            {deletingUser ?
                <DeleteEmployee Employee={{'Name': state.currEmployee.Name, 'UserID': state.currEmployee.UserID}} setDeletingUser={setDeletingUser} type='profile'/>
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
                            <span>Email: </span>
                            <p>{state.currEmployee.email}</p>
                            <span>Name: </span>
                            <p>{state.currEmployee.Name}</p>
                            <span>Position: </span>
                            <p>{state.currEmployee.Position}</p>
                            <div className="profileButtons">
                                <div onClick={() => { setDeletingUser(true)}} className="trash">
                                    <FontAwesomeIcon className="trash" icon={faTrashAlt}/>
                                </div>
                                <button onClick={(ev) => {
                                                createConversation()
                                }}>Message</button>
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
                                        handleAddShift();
                                    }}className="green">Confirm</button>
                                    <button onClick={() => { setAddingShift(false)}} className="red">Cancel</button>
                            </div>
                        </div>
                        : null
                        }
                        
                    <div className="shiftListContent">
                        {state.currShifts.map((shift, i) => {
                            let date;
                            let start;
                            let end;
                            let shiftIcons;
                            
                            if(editActive.active === true && i === editActive.target) {
                               date = <DatePicker
                                            selected={startEditDate}
                                            onChange={(val) => {
                                                setEditStartDate(val);
                                            }}
                                        />
                                start = <DatePicker
                                            selected={startEditTime}
                                            onChange={(val) => {
                                                setEditStartTime(val);
                                            }}
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeIntervals={15}
                                            dateFormat="h:mm aa"
                                            timeCaption="Time"
                                        />
                                end = <DatePicker
                                            selected={endEditTime}
                                            onChange={(val) => {
                                                setEditEndTime(val);
                                            }}
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeIntervals={15}
                                            dateFormat="h:mm aa"
                                            timeCaption="Time"
                                        />
                                shiftIcons = <div className="shiftRowIcons">
                                                <div onClick={( ) => { 
                                                    handleEditShift(shift.ShiftID, shift.Version);
                                                    
                                                    setEditActive({active: false, target: null})}} className="check">
                                                    <FontAwesomeIcon className="checkIcon" icon={faCheck}/>
                                                </div>
                                                <div onClick={() => { setEditActive({active: false, target: null})}} className="cancel">
                                                    <FontAwesomeIcon className="cancelIcon" icon={faTimes}/>
                                                </div>
                                            </div>
                            } else {
                                date = <p>{shift.shiftDate.split(" ")[0]}</p>
                                start = <p>{moment(shift.startTime, 'HH:mm:ss').format('h:mm A')}</p>
                                end = <p>{moment(shift.endTime, 'HH:mm:ss').format('h:mm A')}</p>
                                shiftIcons = <div className="shiftRowIcons">
                                                <div onClick={() => { 
                                                    setEditActive({active: true, target: i})
                                                    let startHours = shift.startTime.split(":");
                                                    let endHours = shift.endTime.split(":");
                                                    let dateInfo = shift.shiftDate.split(/\/| /) 
                                                    let newDate = new Date(dateInfo[2], dateInfo[0] - 1, dateInfo[1]);
                                                    setEditStartDate(newDate);
                                                    let newStartTime = startEditTime;
                                                    let newEndTime = endEditTime;
                                                    newEndTime.setHours(parseInt(endHours[0]), parseInt(endHours[1]));
                                                    newStartTime.setHours(parseInt(startHours[0]), parseInt(startHours[1]));
                                                    setEditStartTime(newStartTime);
                                                    setEditEndTime(newEndTime);
                                                    
                                                    }} className="edit" id={`${i}`}>
                                                    <FontAwesomeIcon className="editIcon" icon={faPen}/>
                                                </div>
                                                <div onClick={() => { 
                                                    setCurrDelete(shift.ShiftID); 
                                                    setDeletingShift(true);
                                                    }} className="trash">
                                                    <FontAwesomeIcon className="trashIcon" icon={faTrashAlt}/>
                                                </div>
                                            </div>
                            }
                           
                            return (
                                <div>
                                    {
                                        deletingShift  && currDelete === shift.ShiftID ?
                                                <div className='popupWrapper'>
                                                    <div className='delete-container'>
                                                        <div className='confirmation-info'>
                                                            <h2>Are you sure you want to delete this shift?</h2>
                                                            <p>{`${moment(shift.startTime, 'HH:mm:ss').format('h:mm A')} - ${moment(shift.endTime, 'HH:mm:ss').format('h:mm A')}`}</p>
                                                        </div>
                                                        <div className='confirmation-buttons'>
                                                            <button onClick={() => { 
                                                                handleShiftDelete()
                                                                }} className='green'>Confirm</button>
                                                            <button onClick={() => { setDeletingShift(false)}} className='red'>Cancel</button>
                                                        </div>
                                                    </div>
                                                </div>
                                        : null
                                    }
                                    <div className="shiftRow">
                                        <p className="num">{i + 1}</p>
                                        <span>Date: </span>
                                        {date}
                                        <span>Start Time: </span>
                                        {start}
                                        <span>End Time: </span>
                                        {end}
                                        {shiftIcons}
                                    </div>        
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
import "./react-datepicker.css";
import { start } from 'repl';


