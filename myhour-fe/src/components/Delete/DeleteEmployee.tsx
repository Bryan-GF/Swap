// Global State
import { GlobalStateContext } from '../../Stores/GlobalStore';

// Functional package imports
import React, {useContext} from 'react';
import {observer} from 'mobx-react-lite';
import { withRouter } from 'react-router';

// Popup component for deleting employees.
const DeleteEmployee = observer((props:any) => {
    
    
    const state = useContext(GlobalStateContext);
    
    // Attempts to delete using deleteUser global state function. Successful response filters 
    // out the deleted employee.
    const handleDelete = async() => {
        const status  = await state.deleteUser(props.Employee.UserID);
        if(status) {
            
            if(props.type === 'profile') {
                props.history.push('/Home');
            } else if(props.type === 'home') {
                state.setBranchData(state.branchData.filter((User) =>
                User.UserID != props.Employee.UserID));
            } 
        }
        props.setDeletingUser(false);
        
    }
    
    return (
        <div className='popupWrapper'>
            <div className='delete-container'>
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
        </div>
    )
});

export default withRouter(DeleteEmployee);