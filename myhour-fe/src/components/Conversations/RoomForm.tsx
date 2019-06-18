import React, {useState} from 'react';
import {observer} from 'mobx-react-lite';

// Desgin
import './Conversations.css';

// Components

const RoomForm = observer((props:any) => {

    const [newRoom, setNewRoom] = useState('');

    const handleSubmit = (ev) => {
        ev.preventDefault();
        props.createRoom(newRoom);
        setNewRoom('');
    }

    return (
        <form 
            onSubmit={(ev) => {handleSubmit(ev)}}
            className="MessageForm">
            <input 
                placeholder="Create Room" 
                value = {newRoom}
                type="text" 
                onChange={(ev) => {setNewRoom(ev.target.value)}}
            />
        </form> 
    )
});

export default RoomForm;