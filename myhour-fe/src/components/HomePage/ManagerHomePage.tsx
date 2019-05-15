import React, {useContext, useEffect, useState} from 'react';
import {observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { GlobalStateContext } from '../../Stores/GlobalStore';
import './Home.css';
import { AxiosResponse } from 'axios';

const ManagerHomePage = observer((props:any) => {
    
    const state = useContext(GlobalStateContext);
    useEffect(() => {
        state.getBranchData();
    }, [])

    console.log(toJS(state.branchData));
    return (
        <div className="ManageWrapper">
            <h2>Manage Employees</h2> 
            <div className="ManageListContainer">
                <div className="ManageListInteractive">
                    <p>{state.branchData.length} Employees</p>
                    <div className="addEmployee">
                        <span>+</span>
                        <p>ADD EMPLOYEE</p>
                    </div>
                </div>
                <div className="ManageListColumn Title">
                    <div className="columnID">Employee ID</div>
                    <div className="columnName">Full Name</div>
                    <div className="columnPosition">Position</div>
                </div>
                {state.branchData.map(employee => {
                    return (
                        <div className="ManageListColumn Employee">
                        <div className="columnID">{employee.EmployeeID}</div>
                        <div className="columnName">{employee.Firstname + " " + employee.Lastname}</div>
                        <div className="columnPosition">{employee.Position}</div>
                </div>
                    )
                })}
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