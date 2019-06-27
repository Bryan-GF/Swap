import React, {useState} from 'react';
import {observer} from 'mobx-react-lite';

// Desgin
import './Conversations.css';

// Components


const RoomList = observer((props:any) => {

    return (
        <div className='RoomList'>
            <ul>
            <h3>Your rooms:</h3>
            {props.rooms.map(room => {
                return (
                    <li key={room.id} className="Room">
                        <a onClick={() => { props.subscribeToRoom(room.id)}}href="#"># {room.name}</a>
                    </li>
                )
            })}
                <button onClick={() => {props.setCreatingRoom(true)}}>Create Room</button>
            </ul>      
        </div>
    )
});

export default RoomList;