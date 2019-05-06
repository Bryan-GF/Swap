import React from 'react';
import {observer} from 'mobx-react-lite';
import './Requests.css';
import Request from './Request';

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

    return (
        <div className='request-list-wrapper'>    
            <div className='header'>
                <h1>Requests</h1>
                <div>

                </div>
            </div>
            <div className='create-request-wrapper'>

            </div>
            <div className='list-content'>
                {tempData.map(request => {
                    return (
                        <Request props={request}/>
                    )
                })}
            </div>
        </div>
    )
});

export default RequestListPage;