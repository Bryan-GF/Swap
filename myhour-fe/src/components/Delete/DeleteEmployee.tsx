import React, {useContext, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import { GlobalStateContext } from '../../Stores/GlobalStore';

const DeleteEmployee = observer((props:any) => {
    
    const state = useContext(GlobalStateContext);
    console.log(props)
    
    return (
        <div className='delete-confirmation-wrapper'>
            <div className='confirmation-info'>
                <h2>Are you sure you want to delete {state.targetEmployee.Name}?</h2>
            </div>
            <div className='confirmation-buttons'>
                <button onClick={() => { 
                    state.deleteUser();
                    props.setDeletingUser(false);
                    }} className='green'>Confirm</button>
                <button onClick={() => { props.setDeletingUser(false)}} className='red'>Cancel</button>
            </div>
        </div>
    )
});

export default DeleteEmployee;