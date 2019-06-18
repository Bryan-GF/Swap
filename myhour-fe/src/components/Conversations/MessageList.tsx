import React from 'react';
import {observer} from 'mobx-react-lite';

// Desgin
import './Conversations.css';

// Components
const DUMMY_DATA = [
    {
        senderId: 'perborgen',
        text: "Hey, how is it going?"
    },
    {
        senderId: 'janedoe',
        text: "Great! How about you?"
    },
    {
        senderId: 'perborgen',
        text: "Good to hear! I am great as well"
    }
]


// Conversations component, still unavailable.
const MessageList = observer((props:any) => {
    console.log(props.messages[0])
    return (
        <div className='MessageListContainer'>
            {props.messages.map((message, index)  => {
                return  (
                    <div key={index} className="MessageList">
                        <div>{message.senderId}</div>
                        <div>{message.text}</div>
                    </div>
                )
            })

            }
        </div>
    )
});

export default MessageList;