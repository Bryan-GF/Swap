// Functional package imports
import React, {useContext, useState, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import Chatkit from '@pusher/chatkit-client';
import { GlobalStateContext } from '../../Stores/GlobalStore';


// Desgin
import './Conversations.css';

// Components
import Nav from '../Navigation/Nav';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import RoomList from './RoomList';
import RoomForm from './RoomForm';
import { join } from 'path';


// Conversations component, still unavailable.

const Conversations = observer((props:any) => {

    const [roomId, setRoomId] = useState(null);
    const [joinedRooms, setJoinedRooms] = useState([]);

    const state = useContext(GlobalStateContext);
    
    useEffect(() => {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator: process.env.REACT_APP_INSTANCE_LOCATOR,
            userId: state.userData.email,
            tokenProvider: new Chatkit.TokenProvider({
                url: process.env.REACT_APP_TOKEN_PROVIDER
            })
        })

        chatManager.connect()
        .then(currentUser => {
            state.setCurrChatter(currentUser);
            setJoinedRooms(state.currChatter.rooms);
        })
    }, [])

    const sendMessage = (text) => {
        state.currChatter.sendMessage({
            text: text,
            roomId: roomId
        })
    }

    const createRoom = (roomName) => { 
        state.currChatter.createRoom({
            name: roomName
        })
        .then(room => {
            setJoinedRooms([...joinedRooms, room]);
            subscribeToRoom(room.id);
        })
        .catch(err => console.log('error creating room', err));
    }

    const subscribeToRoom = (roomId) => {
        state.setMessages([]);
        state.currChatter.subscribeToRoom({
            roomId: roomId,
            hooks: {
                onMessage: message => {
                    state.setMessages([...state.messages, message]);
                }
            }
        })
        .then(room => {
            setRoomId(room.id);  
        })
        .catch(err => console.log('error connecting', err))     
    }

  

    return (
        <div>
            <Nav/>
            <div className='buffer-convo'>
                <div className='Conversation-Container'>
                    <RoomList rooms = {joinedRooms} subscribeToRoom={subscribeToRoom}/>
                    <MessageList messages={state.messages} roomId={roomId}/>
                    <MessageForm sendMessage={sendMessage} disabled={!roomId}/>
                    <RoomForm createRoom={createRoom} />
                </div>
            </div>
        </div>
    )
});

export default Conversations;