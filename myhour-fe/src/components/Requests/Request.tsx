import React from 'react';
import {observer} from 'mobx-react-lite';
import './Requests.css';
import avatar from '../../assets/avatar.png'
import Nav from '../Navigation/Nav';

const Request = observer((props:any) => {
    return (
        <div>
            <div>
                {props.acceptingRequest ?
                    <div className='request-confirmation-wrapper'>
                        <div className='confirmation-info'>
                            <h2>Are you sure you want to take this shift?</h2>
                            <span>Hours: {props.info.startTime} - {props.info.endTime}</span>
                        </div>
                        <div className='confirmation-buttons'>
                            <button onClick={() => { props.handleConfirmation()}} className='green'>Confirm</button>
                            <button onClick={() => { props.setAcceptingRequest(false)}} className='red'>Cancel</button>
                        </div>
                    </div>
                    : ''
                }
                {props.info.urgent ? 
                <div className="urgent-item">
                    <div className='urgent-color'>URGENT</div>
                </div>
                : ''}
                <div className='request-wrapper'>    
                    <div className='user-image'>
                        <img src={props.info.image ? '' : avatar}></img>
                    </div>
                    <div className ='request-content'>
                        <span>{props.info.userName}</span>
                        <span>{props.info.position}</span>
                        <span>{props.info.description}</span>
                        <span>{props.info.startTime} - {props.info.endTime}</span>
                    </div>
                    <div className='request-buttons'>
                        <button onClick={() => { props.setAcceptingRequest(true)}}>Accept</button>
                        <button>Message</button>
                    </div>
                </div>
            </div>
        </div>
    )
});

export default Request;