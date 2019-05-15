import React, {useContext, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import { GlobalStateContext } from '../../Stores/GlobalStore';
import './Home.css';

const ManagerHomePage = observer((props:any) => {
    
    const state = useContext(GlobalStateContext);

    
    return (
        <div className="ManageWrapper">
            <h2>Manage Employees</h2> 
            <div className="ManageListContainer">
                <div className="ManageListInteractive">
                    <p>120 Employees</p>
                    <div className="addEmployee">
                        <span>+</span>
                        <p>Add Employee</p>
                    </div>
                </div>
                <div className="ManageListColumn Title">
                    <div className="columnID">Employee ID</div>
                    <div className="columnName">Full Name</div>
                    <div className="columnPosition">Position</div>
                </div>
                <div className="ManageListColumn Employee">
                    <div className="columnID">...</div>
                    <div className="columnName">...</div>
                    <div className="columnPosition">...</div>
                </div>
            </div>
        </div>
    )
});

export default ManagerHomePage;