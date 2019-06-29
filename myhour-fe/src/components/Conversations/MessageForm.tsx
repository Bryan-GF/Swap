import React, {useState} from 'react';
import {observer} from 'mobx-react-lite';

// Desgin
import './Conversations.css';

// Components


const MessageForm = observer((props:any) => {

    const [newMessage, setNewMessage] = useState('');

    const handleSubmit = (ev) => {
        ev.preventDefault();
        console.log(newMessage)
        props.sendMessage(newMessage);
        setNewMessage('');
    }

    return (
        <div className="MessageForm">
        <form
            id='#MForm'
            onSubmit={(ev) => {}}         
        >  
        </form> 
        <textarea 
            id='#MForm'
            disabled={props.disabled}
            placeholder="Type your message here..." 
            value = {newMessage}
            onChange={(ev) => {setNewMessage(ev.target.value)}}
            onKeyDown={(ev) => {
                if(ev.keyCode === 13) {
                    if(ev.shiftKey) {
                        setNewMessage(newMessage + '\n');                       
                    } else {
                        handleSubmit(ev)
                    }
                }
            }}
        />`
        </div>
    )
});

export default MessageForm;