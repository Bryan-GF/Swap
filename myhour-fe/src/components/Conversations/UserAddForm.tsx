import React, {useState} from 'react';
import {observer} from 'mobx-react-lite';

// Desgin
import './Conversations.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import isEmail from 'validator/lib/isEmail';

// Components

const UserAddForm = observer((props:any) => {

    const [users, setUsers] = useState([]);
    const [user, setUser] = useState('');
    const [invalidEmail, setInvalidEmail] = useState(false);

    const handleSubmit = (ev) => {
        ev.preventDefault();
        props.addUsers(users);
        setUsers([]);
    }

    const handleAddUser = (ev) => {
        ev.preventDefault();
        if(isEmail(user)) {
            setUsers([...users, user]);  
            setInvalidEmail(false);
        } else {
            setInvalidEmail(true);
        }
        setUser('');
    }

    const handleRemove = async(ev, email) => {
        ev.preventDefault();
        let newUsers = users.filter(userEmail => userEmail != email);
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
                {invalidEmail ? <div className='emailIssue'><p>Please enter a valid email address.</p></div> : null}
                {
                    users.map((email) => {               
                        return (
                            <div className='email'>
                                <p className='emailContent'>{email}</p>
                                <div className='emailRemove' onClick={(ev) => {handleRemove(ev, email)}}>
                                    <FontAwesomeIcon className="remove" icon={faTimes}/>
                                </div>                            
                            </div>
                        );
                    })
                }
                <div className='confirmation-buttons'>
                    <button className='green' onClick={(ev) => {handleSubmit(ev)}}>Submit</button>
                    <button className='red' onClick={() => { props.setAddingUsers(false)}}>Cancel</button>
                </div>
            </div>
        </div>
    )
});

export default UserAddForm;