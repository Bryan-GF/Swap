import React, {useContext, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import { GlobalStateContext } from '../../Stores/GlobalStore';
import { Router, withRouter } from 'react-router';

const DeleteEmployee = observer((props:any) => {
    
    const state = useContext(GlobalStateContext);
    
    const handleDelete = async() => {
        const status  = await state.deleteUser(props.Employee.UserID);
        if(props.type === 'profile' && status) {
            props.history.push('/Home');
        }
        props.setDeletingUser(false);
    }
    
    return (
        <div className='delete-confirmation-wrapper'>
            <div className='confirmation-info'>
                <h2>Are you sure you want to delete {props.Employee.Name}?</h2>
            </div>
            <div className='confirmation-buttons'>
                <button onClick={() => { 
                        handleDelete();
                    }} className='green'>Confirm</button>
                <button onClick={() => { props.setDeletingUser(false)}} className='red'>Cancel</button>
            </div>
        </div>
    )
});

export default withRouter(DeleteEmployee);