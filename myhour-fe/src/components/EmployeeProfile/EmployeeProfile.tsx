import React, {useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import { GlobalStateContext } from '../../Stores/GlobalStore';
import Nav from '../Navigation/Nav';
import avatar from '../../assets/avatar.png';
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import DeleteEmployee from '../Delete/DeleteEmployee';

const EmployeeProfile = observer((props:any) => {
    
    const state = useContext(GlobalStateContext);

    const [deletingUser, setDeletingUser] = useState(false);
    return (
        <div>
            {deletingUser ?
                <DeleteEmployee setDeletingUser={setDeletingUser}/>
                : ''
            }
            <Nav/>
            <div className="employeeContentWrapper">
                <div className="employeeProfileContent">
                    <div className="profileHeader">
                        <h2>Employee Profile</h2>
                    </div>
                    <div className="profileContent">
                        <img src={avatar}/>
                        <div className="profileTextContent">
                            <span>Employee ID: </span>
                            <p>{state.targetEmployee.employeeID}</p>
                            <span>Name: </span>
                            <p>{state.targetEmployee.Name}</p>
                            <span>Position: </span>
                            <p>{state.targetEmployee.Position}</p>
                            <div className="profileButtons">
                                <div onClick={() => { setDeletingUser(true)}} className="trash">
                                    <FontAwesomeIcon className="trash" icon={faTrash}/>
                                </div>
                                <button>Message</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="employeeShiftContent">
                    <div className="shiftListHeader">
                        <h2>Shifts</h2>
                        <div className='createShift'>
                            <span className='createPlus'>+ </span>
                            <span className='createContent'>Add Shift</span>
                        </div>
                        
                    </div>
                    <div className="shiftListContent">

                    </div>
                </div>
            </div>
        </div>
    )
});

export default EmployeeProfile;