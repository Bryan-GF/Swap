import React, {useState} from 'react';
import {observer} from 'mobx-react-lite';

// Desgin
import './Conversations.css';
import { withRouter } from 'react-router';

// Components


const RoomList = observer((props:any) => {

    return (
        <div className='RoomList'>
            <ul>
            <h3>Your rooms:</h3>
            <button onClick={() => {props.setCreatingRoom(true)}}>Create Room</button>
            {props.rooms.map(room => {
                return (
                    <div key={room.id} onClick={() => { props.subscribeToRoom(room.id)}} className="Room" style={props.roomId === room.id ? {background: 'white'} : {}}>
                        <a href="#" style={props.roomId === room.id ? {color: '#60B0F4'} : {}}># {room.name}</a>
                    </div>
                )
            })}
                
            </ul>      
        </div>
    )
});

export default RoomList;