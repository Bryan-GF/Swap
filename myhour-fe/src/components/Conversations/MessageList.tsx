import React from 'react';
import {observer} from 'mobx-react-lite';

// Desgin
import './Conversations.css';
import Message from './Message';

// Components


const MessageList = observer((props:any) => {
    return (
        <div className='MessageListContainer'>
            {props.messages.map((message, index)  => {
                return  (
                    <Message key={index} username={message.sender.name} text={message.text}/>
                )
            })}
        </div>
    )
});

export default MessageList;