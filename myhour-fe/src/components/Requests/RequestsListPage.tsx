import React, {useState, useEffect, useContext} from 'react';
import {observer} from 'mobx-react-lite';
import './Requests.css';
import Request from './Request';
import Nav from '../Navigation/Nav';
import queryString from 'query-string'
import { GlobalStateContext } from '../../Stores/GlobalStore';
import format from 'date-fns/format'
import {fixTime} from './RequestHelper';


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
    const [acceptingRequest, setAcceptingRequest] = useState(false);
    const [shiftsList, setShiftsList] = useState([]);
    const [requestsList, setRequestsList] = useState([]);
    const [date, setDate] = useState('');

    const handlePost = () => {
        state.addRequest(requestContent);
        setCreatingRequest(false);
        console.log('Post')
    }

    useEffect(() => {
        
        const values = queryString.parse(props.location.search)
        const val = format(
            values.date.toString(), 
            'YYYY-MM-DD'
        );
        setDate(val);
        async function getData () {
            const request = await state.getRequestsByDay(val);
            if(request != null) {
                setRequestsList(request);
            }         
            const shifts = await state.getShiftsByDay(val);
            if(shifts != null) {
                setRequestContent({...requestContent, ShiftID: shifts[0].ShiftID});
                setShiftsList(shifts);
            }  
        }
        getData();
    }, [])

    console.log(requestContent);
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
                                        console.log(ev.target.value);
                                        setRequestContent({...requestContent, ShiftID: ev.target.value})}}>
                                        {shiftsList.map(shift => {
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
                                setRequestContent({Comment: '', ShiftID: shiftsList[0].ShiftID, Urgent: false});
                                setCreatingRequest(false)}} className="red">Cancel</button>
                        </div>
                    </div>
                : ''}
                <div className='header'>
                    <h1>Requests</h1>
                    <div onClick={() => {setCreatingRequest(true)}} className='addButton'>
                        <span className='createPlus'>+ </span>
                        <span className='createContent'>Create Request</span>
                    </div>
                </div>
                <div className='create-request-wrapper'>

                </div>
                <div className='list-content'>
                    {requestsList.map(request => {
                        return (
                            <Request info={request} date={date} acceptingRequest={acceptingRequest} setAcceptingRequest={setAcceptingRequest}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
});

export default RequestListPage;