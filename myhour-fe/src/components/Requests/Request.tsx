import React, {useContext} from 'react';
import {observer} from 'mobx-react-lite';
import './Requests.css';
import avatar from '../../assets/avatar.png'
import {fixTime} from './RequestHelper';
import { GlobalStateContext } from '../../Stores/GlobalStore';
import DeleteRequest from '../Delete/DeleteRequest';

const Request = observer((props:any) => {

    const state = useContext(GlobalStateContext);
    console.log(props.info);
    const newTimes = fixTime(props.info.startTime, props.info.endTime)
    return (
        <div>
            <div>
                {props.acceptingRequest ?
                    <div className='request-confirmation-wrapper'>
                        <div className='confirmation-info'>
                            <h2>Are you sure you want to take this shift?</h2>
                            <span>Hours: {newTimes.startTime} - {newTimes.endTime}</span>
                        </div>
                        <div className='confirmation-buttons'>
                            <button onClick={() => { 
                                state.acceptRequest(props.info.UserID, props.info.ShiftID);
                                props.setAcceptingRequest(false);
                                }} className='green'>Confirm</button>
                            <button onClick={() => { props.setAcceptingRequest(false)}} className='red'>Cancel</button>
                        </div>
                    </div>
                    : ''
                }
                {props.deletingRequest ? 
                <DeleteRequest setDeletingRequest={props.setDeletingRequest} UserID={props.info.UserID} ShiftID={props.info.ShiftID}/>
                :
                null
                }
                {props.info.Urgent ? 
                <div className="urgent-item">
                    <div className='urgent-color'>URGENT</div>
                </div>
                : ''}
                <div className='request-wrapper'>    
                    <div className='user-image'>
                        <img src={props.info.image ? '' : avatar}></img>
                    </div>
                    <div className ='request-content'>
                        <span>{props.info.Firstname}</span>
                        <span>{props.info.Position}</span>
                        <span>{props.info.Comment}</span>
                        <span>{newTimes.startTime} - {newTimes.endTime}</span>
                    </div>
                    {props.info.UserID === state.userData.UserID ? 
                        <div className='request-buttons'>
                            <button onClick={() => { props.setDeletingRequest(true)}}className="cancelbutton">Cancel</button>
                        </div>
                    :
                        <div className='request-buttons'>
                            <button onClick={() => { props.setAcceptingRequest(true)}}>Accept</button>
                            <button>Message</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
});

export default Request;