// Global State
import { GlobalStateContext } from '../../Stores/GlobalStore';

// Functional package imports
import React, {useState, useEffect, useContext} from 'react';
import {observer} from 'mobx-react-lite';
import format from 'date-fns/format';
import {fixTime} from './RequestHelper';
import queryString from 'query-string';

// Desgin
import './Requests.css';
import avatar from '../../assets/avatar.png';

// Components
import DeleteRequest from '../Delete/DeleteRequest';
import Nav from '../Navigation/Nav';

// Requests list page component, displays every available request.
const RequestListPage = observer((props:any) => {

    const state = useContext(GlobalStateContext);

    interface RequestContent {
        Comment: string;
        ShiftID: string;
        Urgent: boolean;
        Version: string;
    }

    // Popup Handlers
    const [acceptingRequest, setAcceptingRequest] = useState(false);
    const [deletingRequest, setDeletingRequest] = useState(false);
    const [creatingRequest, setCreatingRequest] = useState(false);

    // Content Handlers
    const [requestContent, setRequestContent] = useState<RequestContent>({Comment: '', ShiftID: '', Urgent: false, Version: ''});
    const [requestTime, setRequestTime] = useState('');

    //Target Handlers
    const [targetRequest, setTargetRequest] = useState('');

    // Attempts to post request. On success add neq request to global state todaysRequest array.
    // Then filters global state todaysShifts array to remove shift. Switches creatingRequest locale
    // state value to false, getting rid of popup.
    const handlePost = async() => {
        if(requestContent.ShiftID.length > 1) {           
            let status = await state.addRequest(requestContent);
            if(status) {
                state.setTodaysRequests([...state.todaysRequests, {
                    Comment: requestContent.Comment,
                    Firstname: state.userData.Firstname,
                    Position: state.userData.Position,
                    ShiftID: requestContent.ShiftID,
                    Urgent: requestContent.Urgent,
                    UserID: state.userData.UserID,
                    Time: requestTime
                }]);
                let newArr = await state.todaysShifts.filter((shift) =>
                requestContent.ShiftID != shift.ShiftID);
                state.setTodaysShifts(newArr);
                if(newArr.length > 0) {
                    let newTimes = fixTime(newArr[0].startTime, newArr[0].endTime);
                    setRequestTime(`${newTimes.startTime} - ${newTimes.endTime}`);
                    setRequestContent({...requestContent, ShiftID: newArr[0].ShiftID, Version: newArr[0].Version}); 
                }
                
            }
        }
        setCreatingRequest(false);
    }

    // Attempts to accept request through global state function acceptRequest. On success
    // sets local state acceptingRequest value to false, getting rid of popup.
    const handleAcceptRequest = async (UserID, ShiftID, Version) => {
        let status = await state.acceptRequest(UserID, ShiftID, Version);
        if(status) {
            setAcceptingRequest(false);
        }
        
    }


    // On component did mount, attempts to get requests for the day through global state function
    // getRequestsByDay.
    useEffect(() => {   
        const values = queryString.parse(props.location.search)
        const val = format(
            values.date.toString(), 
            'YYYY-MM-DD'
        );

        // Have to use a function for useEffect to allow async.
        async function getData () {
            state.getRequestsByDay(val);
            const shiftInfo = await state.getShiftsByDay(val);
            if(shiftInfo != null) {
                let newTimes = fixTime(shiftInfo.startTime, shiftInfo.endTime);
                setRequestTime(`${newTimes.startTime} - ${newTimes.endTime}`);
                setRequestContent({...requestContent, ShiftID: shiftInfo.ShiftID, Version: shiftInfo.Version}); 
            }
        }
        getData();
        
    }, [])

    return (
        <div>
            <Nav/>
            <div className='request-list-wrapper'>
                {creatingRequest ? 
                    <div className='request-creator-wrapper'>
                        <h2>Request Creator</h2>
                        <div className='creator-content'>
                            <textarea 
                                maxLength={200}
                                placeholder='Could someone please take over this shift for me?'
                                onChange={(ev) => {setRequestContent({...requestContent, Comment: ev.target.value})}}
                            />
                            <div className='radioSelect'>
                                <div className="myselect">
                                    <select className="form-control" id="test" onChange={(ev) => {
                                        setRequestTime(ev.target[ev.target.selectedIndex].textContent);
                                        setRequestContent({...requestContent, ShiftID: ev.target.value, Version: ev.target[ev.target.selectedIndex].id})}}>
                                        {state.todaysShifts.map(shift => {
                                            let newTimes = fixTime(shift.startTime, shift.endTime);
                                            return (
                                                <option id={shift.Version} value={shift.ShiftID}>{newTimes.startTime} - {newTimes.endTime}</option>
                                            )
                                        }   
                                        )}
                                </select>
                                
                                </div>
                                <label className="container">Urgent?
                                    <input type="checkbox" checked={requestContent.Urgent}/> 
                                    <span onClick={() => { setRequestContent({...requestContent, Urgent: !requestContent.Urgent})}} className="checkmark"></span> 
                                </label> 
                            </div>
                            
                        </div>
                        <div className='creator-buttons'>
                            <button onClick={() => {handlePost()}} className="green">Post</button>
                            <button onClick={() => {
                                setRequestContent({Comment: '', ShiftID: state.todaysShifts[0].ShiftID, Urgent: false, Version: ''});
                                setCreatingRequest(false)}} className="red">Cancel</button>
                        </div>
                    </div>
                : ''}
                <div className='header'>
                    <h1>Requests</h1>
                    <div onClick={() => { state.todaysShifts.length > 0 ? setCreatingRequest(true) : ''}} className={`addButton ${state.todaysShifts.length > 0  ? '' : 'none'}`}>
                        <span className='createPlus'>+ </span>
                        <span className='createContent'>Create Request</span>
                    </div>
                </div>
                <div className='create-request-wrapper'>

                </div>
                <div className='list-content'>
                    {state.todaysRequests.map(request => {
                        let newTimes = null;
                            if(!request.Time) {
                                newTimes = fixTime(request.startTime, request.endTime);
                            }
                        return (                         
                            <div>
                                {acceptingRequest && targetRequest === request.ShiftID ?
                                    <div className='request-confirmation-wrapper'>
                                        <div className='confirmation-info'>
                                            <h2>Are you sure you want to take this shift?</h2>
                                            {newTimes != null ?
                                                <span>{`${newTimes.startTime} - ${newTimes.endTime}`}</span>                           
                                            :
                                                <span>{request.Time}</span>
                                            }
                                        </div>
                                        <div className='confirmation-buttons'>
                                            <button onClick={() => {
                                                handleAcceptRequest(request.UserID, request.ShiftID, request.Version);                                               
                                                }} className='green'>Confirm</button>
                                            <button onClick={() => { setAcceptingRequest(false)}} className='red'>Cancel</button>
                                        </div>
                                    </div>
                                    : ''
                                }
                                {deletingRequest && targetRequest === request.ShiftID ? 
                                <DeleteRequest setDeletingRequest={setDeletingRequest} UserID={request.UserID} ShiftID={request.ShiftID}/>
                                :
                                null
                                }
                                {request.Urgent ? 
                                <div className="urgent-item">
                                    <div className='urgent-color'>URGENT</div>
                                </div>
                                : ''}
                                <div className='request-wrapper'>    
                                    <div className='user-image'>
                                        <img src={request.image ? '' : avatar}></img>
                                    </div>
                                    <div className ='request-content'>
                                        <span>{request.Firstname}</span>
                                        <span>{request.Position}</span>
                                        <span>{request.Comment}</span>
                                        {newTimes != null ?
                                            <span>{`${newTimes.startTime} - ${newTimes.endTime}`}</span>                           
                                        :
                                            <span>{request.Time}</span>
                                        }
                                    </div>
                                    {request.UserID === state.userData.UserID ? 
                                        <div className='request-buttons'>
                                            <button onClick={() => { 
                                                setDeletingRequest(true);
                                                setTargetRequest(request.ShiftID);
                                                }}className="cancelbutton">Cancel</button>
                                        </div>
                                    :
                                        <div className='request-buttons'>
                                            <button onClick={() => { 
                                                
                                                setAcceptingRequest(true);
                                                setTargetRequest(request.ShiftID);
                                                }}>Accept</button>
                                            <button>Message</button>
                                        </div>
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
});

export default RequestListPage;