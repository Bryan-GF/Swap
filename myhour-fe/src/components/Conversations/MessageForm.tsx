import React, {useState} from 'react';
import {observer} from 'mobx-react-lite';

// Desgin
import './Conversations.css';

// Components


const MessageForm = observer((props:any) => {

    const [newMessage, setNewMessage] = useState('');

    const handleSubmit = (ev) => {
        ev.preventDefault();
        console.log(newMessage);
    }

    return (
        <form 
            onSubmit={(ev) => {handleSubmit(ev)}}
            className="MessageForm">
            <input 
                placeholder="Type your message here..." 
                value = {newMessage}
                type="text" 
                onChange={(ev) => {setNewMessage(ev.target.value)}}
            />
        </form> 
    )
});

export default MessageForm;