import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';

// Desgin
import './Conversations.css';

// Components


const ConversationHeader = observer((props:any) => {

    let userlist = '';
    return (
        <div className="Header">
            {props.roomUsers.map((user, index) => {
                if(index === props.roomUsers.length - 1) {
                    userlist += user.name;                   
                } else {
                    userlist += user.name + ", ";
                }             
            })}
            <p>{userlist}</p>
        </div>
    )
});

export default ConversationHeader;