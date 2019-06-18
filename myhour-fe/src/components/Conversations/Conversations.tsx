// Functional package imports
import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import Chatkit from '@pusher/chatkit-client';

// Desgin
import './Conversations.css';

// Components
import Nav from '../Navigation/Nav';
import MessageList from './MessageList';
import MessageForm from './MessageForm';

// Conversations component, still unavailable.
const Conversations = observer((props:any) => {

    const [messages, setMessages] = useState([]);
   
    
    useEffect(() => {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator: process.env.REACT_APP_INSTANCE_LOCATOR,
            userId: 'testemployee@gmail.com',
            tokenProvider: new Chatkit.TokenProvider({
                url: process.env.REACT_APP_TOKEN_PROVIDER
            })
        })

        chatManager.connect()
        .then(async(currentUser) => {
            const newArray = [];
            await currentUser.subscribeToRoom({
                roomId: "19408111",
                hooks: {
                    onMessage: async (message) => {
                        newArray.push(message);
                    }
                }
            })
            setMessages(newArray);
        })
    }, [])

    console.log(messages);
    return (
        <div>
            <Nav/>
            <div className='buffer-convo'>
                <div className='Conversation-Container'>
                    <MessageList messages={messages}/>
                    <MessageForm/>
                </div>
            </div>
        </div>
    )
});

export default Conversations;