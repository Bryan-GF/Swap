import React, {useContext, useEffect, useState} from 'react';
import {observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { GlobalStateContext } from '../../Stores/GlobalStore';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlusSquare, faPlusCircle } from '@fortawesome/free-solid-svg-icons'

const ManagerHomePage = observer((props:any) => {

    const state = useContext(GlobalStateContext);

    const [targetEmployee, setTargetEmployee] = useState(null)
    const [addingUser, setAddingUser] = useState(false);
    const [deletingUser, setDeletingUser] = useState(false);
    const [newEmployeeInfo, setNewEmployeeInfo] = useState({
        "employeeID": '',
        "Firstname": '',
        "Lastname": '',
        "Position": '',
        "Password": ''
    })
    const [activeErrors, setActiveErrors] = useState({"employeeID": false, "Firstname": false, "Lastname": false, "Position": false, "Password": false})

    const handleAddEmployee = () => {
        const {employeeID, Firstname, Lastname, Password, Position} = newEmployeeInfo;
        let safeActive = {"employeeID": false, "Firstname": false, "Lastname": false, "Position": false, "Password": false}
        let newActive = {"employeeID": employeeID.length === 0, "Firstname": Firstname.length === 0, "Lastname": Lastname.length === 0, "Position": Position.length === 0, "Password": Password.length < 7}
        setActiveErrors(newActive)
        if(JSON.stringify(safeActive) === JSON.stringify(newActive)) {
            setActiveErrors({"employeeID": false, "Firstname": false, "Lastname": false, "Position": false, "Password": false});
            state.addEmployee(newEmployeeInfo);
            setAddingUser(false);
        }  
    }

    useEffect(() => {
        state.getBranchData();
    }, [])

    return (
        <div>
            {addingUser ? 
                    <div className='employee-adder-wrapper'>
                        <h2>Add Employee</h2>
                        <div className='adder-content'>
                            <span>Employee ID</span>
                            <input type="text" onChange={(ev) => {setNewEmployeeInfo({...newEmployeeInfo, "employeeID": ev.target.value})}}/>
                            {activeErrors.employeeID ? <p>Please include an employee id.</p> : null}
                            <span>First Name</span>
                            <input type="text" onChange={(ev) => {setNewEmployeeInfo({...newEmployeeInfo, "Firstname": ev.target.value})}}/>
                            {activeErrors.Firstname ? <p>Please include a first name.</p> : null}
                            <span>Last Name</span>
                            <input type="text" onChange={(ev) => {setNewEmployeeInfo({...newEmployeeInfo, "Lastname": ev.target.value})}}/>
                            {activeErrors.Lastname ? <p>Please include a last name.</p> : null}
                            <span>Position</span>
                            <input type="text" onChange={(ev) => {setNewEmployeeInfo({...newEmployeeInfo, "Position": ev.target.value})}}/>
                            {activeErrors.Position ? <p>Please include a position.</p> : null}
                            <span>Temporary Password</span>
                            <input type="text" onChange={(ev) => {setNewEmployeeInfo({...newEmployeeInfo, "Password": ev.target.value})}}/>
                            {activeErrors.Password ? <p>Password must be a minimum of 7 characters.</p> : null}
                        </div>
                        <div className='employee-adder-buttons'>
                            <button onClick={() => {
                                handleAddEmployee();
                            }} className="green">Create</button>
                            <button onClick={() => {
                                setAddingUser(false);
                                setActiveErrors({"employeeID": false, "Firstname": false, "Lastname": false, "Position": false, "Password": false});
                                setNewEmployeeInfo({"employeeID": '', "Firstname": '', "Lastname": '', "Position": '', "Password": ''});
                            }} className="red">Cancel</button>
                        </div>
                    </div>
                : ''}
            {deletingUser ?
                <div className='delete-confirmation-wrapper'>
                    <div className='confirmation-info'>
                        <h2>Are you sure you want to delete {targetEmployee.Name}?</h2>
                    </div>
                    <div className='confirmation-buttons'>
                        <button onClick={() => { 
                            state.deleteUser(targetEmployee.employeeID);
                            setDeletingUser(false);
                            }} className='green'>Confirm</button>
                        <button onClick={() => { setDeletingUser(false)}} className='red'>Cancel</button>
                    </div>
                </div>
                : ''
            }
            <div className="ManageWrapper">
                <h2>Manage Employees</h2> 
                <div className="ManageListContainer">
                    <div className="ManageListInteractive">
                        <p>{state.branchData.length} Employees</p>
                        <div onClick={() => { setAddingUser(true);}} className="addEmployee">
                            <FontAwesomeIcon icon={faPlusCircle}/>
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
                            <div className="columnIcons">
                                <div className="plus-wrapper">
                                    <FontAwesomeIcon className="plus" icon={faPlusSquare}/>
                                </div>
                                <div onClick={() => { 
                                    setTargetEmployee({employeeID: employee.EmployeeID, branchID: employee.branchID, Name: employee.Firstname + ' ' + employee.Lastname});
                                    setDeletingUser(true);     
                                }} className="trash-wrapper">
                                    <FontAwesomeIcon className="trash" icon={faTrash}/>
                                </div>
                            </div>
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
        </div>
    )
});

export default ManagerHomePage;