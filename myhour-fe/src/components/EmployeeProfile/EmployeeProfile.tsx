import React, {useContext, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import { GlobalStateContext } from '../../Stores/GlobalStore';
import Nav from '../Navigation/Nav';
import avatar from '../../assets/avatar.png';
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const EmployeeProfile = observer((props:any) => {
    
    const state = useContext(GlobalStateContext);

    
    return (
        <div>
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
                            <p>1O1PEL</p>
                            <span>Name: </span>
                            <p>Bob Bilbow</p>
                            <span>Position: </span>
                            <p>Cashier</p>
                            <div className="profileButtons">
                                <div className="trash">
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
                    </div>
                    <div className="shiftListContent">

                    </div>
                </div>
            </div>
        </div>
    )
});

export default EmployeeProfile;