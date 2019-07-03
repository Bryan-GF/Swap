import React from 'react';
import {observer} from 'mobx-react-lite';

// Desgin
import './Conversations.css';

// Components


const Message = observer((props:any) => {
    return (
        <div className="Message">
            <div className='messageHeader'>{props.username}</div>
            <div className='messageContent'>{props.text}</div>
        </div>
    )
});

export default Message;