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
        <div className='popupWrapper'>
            <div className='Form RoomForm'>
                <h2>Name Your Room:</h2>
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
                <div className='confirmation-buttons'>
                    <button className='green' onClick={(ev) => { handleSubmit(ev)}}>Submit</button>
                    <button className='red' onClick={(ev) => { props.setCreatingRoom(false)}}>Cancel</button>
                </div>
            </div>
        </div>
    )
});

export default RoomForm;