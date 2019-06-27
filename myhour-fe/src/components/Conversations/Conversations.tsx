// Functional package imports
import React, {useContext, useState, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import Chatkit from '@pusher/chatkit-client';
import { GlobalStateContext } from '../../Stores/GlobalStore';
import axios from 'axios';


// Desgin
import './Conversations.css';

// Components
import Nav from '../Navigation/Nav';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import RoomList from './RoomList';
import RoomForm from './RoomForm';
import ConversationHeader from './ConversationHeader';
import UserAddForm from './UserAddForm';


// Conversations component, still unavailable.

const Conversations = observer((props:any) => {

    const [roomId, setRoomId] = useState(null);
    const [roomUsers, setRoomUsers] = useState([]);
    const [joinedRooms, setJoinedRooms] = useState([]);

    const [creatingRoom, setCreatingRoom] = useState(false);
    const [addingUsers, setAddingUsers] = useState(false);

    const state = useContext(GlobalStateContext);

    useEffect(() => {
        //Weird work around to tokenprovider, to get API working with SDK
        let tokenprovider =  {
            fetchToken() {
                return state.getToken();
            }
        }
        if(!state.currChatter) {
            const chatManager = new Chatkit.ChatManager({
                instanceLocator: process.env.REACT_APP_INSTANCE_LOCATOR,
                userId: state.userData.email,
                tokenProvider: tokenprovider
            })

            chatManager.connect()
            .then(currentUser => {
                state.setCurrChatter(currentUser);
                setJoinedRooms(state.currChatter.rooms);
            })
        } else {
            setJoinedRooms(state.currChatter.rooms)
        }     
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
            setRoomUsers(room.users);
            setRoomId(room.id);  
        })
        .catch(err => console.log('error connecting', err))     
    }

    const addUsers = async(users) => {
        state.addToChatRoom(roomId, users);
    }
    
    const leaveRoom = (ev) => {
        ev.preventDefault();
        state.currChatter.leaveRoom({ roomId: roomId })
        .then(room => {
            setJoinedRooms(joinedRooms.filter((rooms) =>
            rooms.id != room.id));
          console.log(`Left room with ID: ${room.id}`)
        })
        .catch(err => {
          console.log(`Error leaving room ${roomId}: ${err}`)
        })
    }

    return (
        <div>
            <Nav/>
            <div className='buffer-convo'>
                <div className='Conversation-Container'>
                    {creatingRoom ?
                        <RoomForm createRoom={createRoom}/>
                        :
                        null
                    }
                    {addingUsers ?
                        <UserAddForm addUsers={addUsers}/>
                        :
                        null
                    }
                    <RoomList rooms = {joinedRooms} subscribeToRoom={subscribeToRoom} setCreatingRoom={setCreatingRoom}/>
                    <div className='ConversationListContainer'>
                        <ConversationHeader roomUsers={roomUsers} setAddingUsers={setAddingUsers} leaveRoom={leaveRoom}/>
                        <MessageList messages={state.messages} roomId={roomId}/>
                    </div>
                    <MessageForm sendMessage={sendMessage} disabled={!roomId}/>
                </div>
            </div>
        </div>
    )
});

export default Conversations;