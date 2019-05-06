import React from 'react';
import {observer} from 'mobx-react-lite';
import './Requests.css';
import avatar from '../../assets/avatar.png'

const Request = observer((props:any) => {
    console.log(props)
    return (
        <div>
            {props.props.urgent ? 
            <div className="urgent-item">
                <div className='urgent-color'>URGENT</div>
            </div>
            : ''}
            <div className='request-wrapper'>    
                <div className='user-image'>
                    <img src={props.props.image ? '' : avatar}></img>
                </div>
                <div className ='request-content'>
                    
                    <span>{props.props.position}</span>
                    <span>{props.props.description}</span>
                    <span>{props.props.startTime} - {props.props.endTime}</span>
                </div>
                <div className='request-buttons'>
                    <button>Accept</button>
                    <button>Message</button>
                </div>
            </div>
        </div>
    )
});

export default Request;