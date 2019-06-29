import React, {useEffect, useRef} from 'react';
import {observer} from 'mobx-react-lite';

// Desgin
import './Conversations.css';
import Message from './Message';

// Components


const MessageList = observer((props:any) => {

    const list = useRef(null);

    useEffect(() => {
        if(list.current.scrollTop + list.current.clientHeight + 100 >= list.current.scrollHeight) {
            list.current.scrollTop = list.current.scrollHeight;
        }
        
    },[props.messages])

    return (
        <div className='MessageListContainer'>
            {props.roomId ? 
                <div className="MessageList" ref={list}>
                    {props.messages.map((message, index)  => {
                        console.log(message);
                        return  (
                            <Message key={index} username={message.sender.name} text={message.text}/>
                        )
                    })}
                </div>
                :
                <div className="MessageList" ref={list}>
                    <div className="JoinRoom">
                        &larr; Join a room!
                    </div>
                </div>
            }
        </div>
    )
});

export default MessageList;