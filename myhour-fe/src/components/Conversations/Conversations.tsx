// Functional package imports
import React from 'react';
import {observer} from 'mobx-react-lite';

// Desgin
import './Conversations.css';

// Components
import Nav from '../Navigation/Nav';

// Conversations component, still unavailable.
const Conversations = observer((props:any) => {
    
    return (
        <div>
            <Nav/>
            <div className='buffer-convo'>
                <div className='Conversation-Container'>
                    <h1>Feature Unavailable</h1>
                    <p>Swap conversations feature still in dvelopment.</p>
                </div>
            </div>
        </div>
    )
});

export default Conversations;