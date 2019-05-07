import React, {useState, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import './Requests.css';
import Request from './Request';
import { number } from 'prop-types';
import Nav from '../Navigation/Nav';

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

const RequestListPage = observer(() => {

    const tempData = [
        {
            userID: 10,
            userName: 'Brandon',
            position: 'Cashier',
            description: 'Really need someone to pick up this shift for me!',
            startTime: '12:30 PM',
            endTime: '3:30 PM',
            urgent: true,
        },
        {
            userID: 2,
            userName: 'Josh',
            position: 'Cashier',
            description: 'Family emergency',
            startTime: '12:45 PM',
            endTime: '5:20 PM',
            urgent: true,
        },
        {
            userID: 8,
            userName: 'Liz',
            position: 'Cashier',
            description: "I can't come in today, need to study for a test.",
            startTime: '6:00 PM',
            endTime: '11:00 PM',
            urgent: false,
        },
    ]

    //Want to get the shifts for this person for the specified day
    const tempShifts = [
        {
            id: 1,
            information: '12:30PM - 4:30PM'
        },
        {
            id: 2,
            information: '7:30AM - 9:00AM'
        }
    ]

    interface RequestContent {
        message: string;
        shiftID: number;
    }

    const [creatingRequest, setCreatingRequest] = useState(false);
    const [requestContent, setRequestContent] = useState<RequestContent>({message: '', shiftID: 0})
    const [acceptingRequest, setAcceptingRequest] = useState(false);

    const handlePost = () => {
        setCreatingRequest(false);
        console.log('Post')
    }

    const handleConfirmation = () => {
        setAcceptingRequest(false);
        console.log('Confirmation')
    }

    useEffect(() => {
      return (
        setRequestContent({...requestContent, shiftID: tempShifts[0].id})
      );
    }, [])

    console.log(requestContent)
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
                                onChange={(ev) => {setRequestContent({...requestContent, message: ev.target.value})}}
                            />
                            <div className="myselect">
                                <select className="form-control" id="test" onChange={(ev) => {
                                    console.log(ev.target.value);
                                    setRequestContent({...requestContent, shiftID: +ev.target.value})}}>
                                    {tempShifts.map(shift =>
                                        <option value={shift.id}>{shift.information}</option>
                                    )}
                            </select>
                            </div>
                        </div>
                        <div className='creator-buttons'>
                            <button onClick={() => {handlePost()}} className="green">Post</button>
                            <button onClick={() => {setCreatingRequest(false)}} className="red">Cancel</button>
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
                    {tempData.map(request => {
                        return (
                            <Request info={request} handleConfirmation={handleConfirmation} acceptingRequest={acceptingRequest} setAcceptingRequest={setAcceptingRequest}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
});

export default RequestListPage;