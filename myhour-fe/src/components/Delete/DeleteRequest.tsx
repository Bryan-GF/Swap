import React, {useContext, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import { GlobalStateContext } from '../../Stores/GlobalStore';

const DeleteRequest= observer((props:any) => {
    
    const state = useContext(GlobalStateContext);
    const handleDelete = async() => {
        let status = await state.deleteRequest(props.UserID, props.ShiftID);
        if(status) {
            state.setTodaysRequests(state.todaysRequests.filter((request) =>
            request.ShiftID != props.ShiftID));
            props.setDeletingRequest(false);
        }
        
    }

    return (
        <div className='popupWrapper'>
            <div className='delete-container'>
                <div className='confirmation-info'>
                    <h2>Are you sure you want to delete this request?</h2>
                </div>
                <div className='confirmation-buttons'>
                    <button onClick={() => { 
                        handleDelete();           
                        }} className='green'>Confirm</button>
                    <button onClick={() => { props.setDeletingRequest(false)}} className='red'>Cancel</button>
                </div>
            </div>
        </div>
    )
});

export default DeleteRequest;