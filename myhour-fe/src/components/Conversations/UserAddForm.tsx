import React, {useState} from 'react';
import {observer} from 'mobx-react-lite';

// Desgin
import './Conversations.css';

// Components

const UserAddForm = observer((props:any) => {

    const [users, setUsers] = useState({});
    const [user, setUser] = useState('');

    const handleSubmit = (ev) => {
        ev.preventDefault();
        props.addUsers(users);
        setUsers([]);
    }

    const handleAddUser = (ev) => {
        ev.preventDefault();
        
        if(!users[user]) {
            let newUsers = users;
            newUsers[user] = 0;
            setUsers(newUsers);
        }     
        setUser('');
    }

    const handleRemove = async(ev, user) => {
        ev.preventDefault();
        let newUsers = users;
        delete newUsers[user];
        setUsers(newUsers);
    }

    return (
        <div className='popupWrapper'>
            <div className='Form UserForm'>
                <h2>Add To Room:</h2>
                <form 
                    onSubmit={(ev) => {handleAddUser(ev)}}
                    className="MessageForm">
                    <input 
                        placeholder="Co-worker's email" 
                        value = {user}
                        type="text" 
                        onChange={(ev) => {setUser(ev.target.value)}}
                    />
                </form> 
                {  
                    Object.keys(users).forEach((username) => {               
                    return(
                        <div>
                            <p>{username}</p>
                            <button onClick={(ev) => {handleRemove(ev, user)}}> X </button>
                            
                        </div>
                    )
                })}
                <div className='confirmation-buttons'>
                    <button className='green' onClick={(ev) => {handleSubmit(ev)}}>Submit</button>
                    <button className='red' onClick={() => { props.setAddingUsers(false)}}>Cancel</button>
                </div>
            </div>
        </div>
    )
});

export default UserAddForm;