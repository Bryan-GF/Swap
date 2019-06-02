import React, {useState, useEffect, useContext} from 'react';
import {observer} from 'mobx-react-lite';
import './Requests.css';
import Nav from '../Navigation/Nav';
import queryString from 'query-string';
import { GlobalStateContext } from '../../Stores/GlobalStore';
import format from 'date-fns/format';
import {fixTime} from './RequestHelper';
import DeleteRequest from '../Delete/DeleteRequest';
import avatar from '../../assets/avatar.png';

/*NOTES:
Important:
    - Need to make it so someone can't add a shift to their schedule if they already have a shift at that time.
    - Possibly need a way to limit how many hours someone can work a day.
    - Need a clickaway for the create request.
    - Need a popup for the accept button, to double confirm they want to take the shift. Also needs clickaway.
    - Need to make it so urgent requests always show up first.
For Later: 
    - Messages should open up the conversation tab with the ability to message the person of interest.
*/

const RequestListPage = observer((props:any) => {

    const state = useContext(GlobalStateContext);

    interface RequestContent {
        Comment: string;
        ShiftID: string;
        Urgent: boolean;
    }

    const [creatingRequest, setCreatingRequest] = useState(false);
    const [requestContent, setRequestContent] = useState<RequestContent>({Comment: '', ShiftID: '', Urgent: false});
    const [requestTime, setRequestTime] = useState('');
    const [acceptingRequest, setAcceptingRequest] = useState(false);
    const [deletingRequest, setDeletingRequest] = useState(false);
    const [targetRequest, setTargetRequest] = useState('');
    
    const [date, setDate] = useState('');

    const handlePost = async() => {
        console.log(requestContent.ShiftID);
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
                    setRequestContent({...requestContent, ShiftID: newArr[0].ShiftID}); 
                }
                
            }
        }
        setCreatingRequest(false);
    }

    const handleAcceptRequest = async (UserID, ShiftID, Version) => {
        let status = await state.acceptRequest(UserID, ShiftID, Version);
        if(status) {
            setAcceptingRequest(false);
        }
        
    }

    useEffect(() => {
        
        const values = queryString.parse(props.location.search)
        const val = format(
            values.date.toString(), 
            'YYYY-MM-DD'
        );
        setDate(val);
        async function getData () {
            state.getRequestsByDay(val);
            const shiftInfo = await state.getShiftsByDay(val);
            if(shiftInfo != null) {
                let newTimes = fixTime(shiftInfo.startTime, shiftInfo.endTime);
                setRequestTime(`${newTimes.startTime} - ${newTimes.endTime}`);
                setRequestContent({...requestContent, ShiftID: shiftInfo.ShiftID}); 
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
                                        setRequestContent({...requestContent, ShiftID: ev.target.value})}}>
                                        {state.todaysShifts.map(shift => {
                                            let newTimes = fixTime(shift.startTime, shift.endTime);
                                            return (
                                                <option value={shift.ShiftID}>{newTimes.startTime} - {newTimes.endTime}</option>
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
                                setRequestContent({Comment: '', ShiftID: state.todaysShifts[0].ShiftID, Urgent: false});
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