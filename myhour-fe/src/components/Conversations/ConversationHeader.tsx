import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';

// Desgin
import './Conversations.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

// Components


const ConversationHeader = observer((props:any) => {

    let userlist = '';
    return (
        <div>
        {props.roomId ? 
            <div className="Header">
                {props.roomUsers.map((user, index) => {
                        if(index === props.roomUsers.length - 1) {
                            userlist += user.name;                   
                        } else {
                            userlist += user.name + ", ";
                        }             
                    })}
                    <p>{userlist}</p>
                    <div className="HeaderButtons">
                        <div onClick={() => { props.setAddingUsers(true)}}className="plus-wrapper">
                            <FontAwesomeIcon className="plus" icon={faPlusSquare}/>
                        </div>
                        <div onClick={(ev) => { props.leaveRoom(ev)}}className="signOut-wrapper">
                            <FontAwesomeIcon className="signOut" icon={faSignOutAlt}/>
                        </div>
                    </div>
            </div>
        : null
        }     
        </div> 
        
    )
});

export default ConversationHeader;