import React, {useContext, useEffect, useState} from 'react';
import {observer } from 'mobx-react-lite';
import { GlobalStateContext } from '../../Stores/GlobalStore';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPlusSquare, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import DeleteEmployee from '../Delete/DeleteEmployee';
import isEmail from 'validator/lib/isEmail';

const ManagerHomePage = observer((props:any) => {

    const state = useContext(GlobalStateContext);

    const [addingUser, setAddingUser] = useState(false);
    const [deletingUser, setDeletingUser] = useState(false);
    const [newEmployeeInfo, setNewEmployeeInfo] = useState({
        "email": '',
        "Firstname": '',
        "Lastname": '',
        "Position": '',
        "Password": ''
    })
    const [activeErrors, setActiveErrors] = useState({"email": true, "Firstname": false, "Lastname": false, "Position": false, "Password": false})
    const [targetEmployee, setTargetEmployee] = useState({Name: '', UserID: ''});

    const handleAddEmployee = async() => {
        const {email, Firstname, Lastname, Password, Position} = newEmployeeInfo;
        let safeActive = {"email": true, "Firstname": false, "Lastname": false, "Position": false, "Password": false}
        let newActive = {"email": isEmail(email), "Firstname": Firstname.length === 0, "Lastname": Lastname.length === 0, "Position": Position.length === 0, "Password": Password.length < 7}
        setActiveErrors(newActive)
        if(JSON.stringify(safeActive) === JSON.stringify(newActive)) {
            setActiveErrors({"email": false, "Firstname": false, "Lastname": false, "Position": false, "Password": false});
            const result = await state.addEmployee(newEmployeeInfo);
            if(result) {
                state.setBranchData([...state.branchData, {UserID: result, email: email, Firstname: Firstname, Lastname: Lastname, Position: Position}])
            }
            setAddingUser(false);
        }  
    }

    useEffect(() => {
        state.getBranchData();
    }, [])

    return (
        <div>
            {addingUser ? 
                    <div className='popupWrapper'>                      
                        <div className='inputWrapper'>
                            <h2>Add Employee</h2>
                            <label>Email</label>
                            <input type="text" onChange={(ev) => {setNewEmployeeInfo({...newEmployeeInfo, "email": ev.target.value})}}/>
                            {!activeErrors.email ? <p>Please include a valid email.</p> : null}
                            <label>First Name</label>
                            <input type="text" onChange={(ev) => {setNewEmployeeInfo({...newEmployeeInfo, "Firstname": ev.target.value})}}/>
                            {activeErrors.Firstname ? <p>Please include a first name.</p> : null}
                            <label>Last Name</label>
                            <input type="text" onChange={(ev) => {setNewEmployeeInfo({...newEmployeeInfo, "Lastname": ev.target.value})}}/>
                            {activeErrors.Lastname ? <p>Please include a last name.</p> : null}
                            <label>Position</label>
                            <input type="text" onChange={(ev) => {setNewEmployeeInfo({...newEmployeeInfo, "Position": ev.target.value})}}/>
                            {activeErrors.Position ? <p>Please include a position.</p> : null}
                            <label>Temporary Password</label>
                            <input type="text" onChange={(ev) => {setNewEmployeeInfo({...newEmployeeInfo, "Password": ev.target.value})}}/>
                            {activeErrors.Password ? <p>Password must be a minimum of 7 characters.</p> : null}
                            <div className='confirmation-buttons'>
                            <button onClick={() => {
                                handleAddEmployee();
                                
                            }} className="green">Create</button>
                            <button onClick={() => {
                                setAddingUser(false);
                                setActiveErrors({"email": false, "Firstname": false, "Lastname": false, "Position": false, "Password": false});
                                setNewEmployeeInfo({"email": '', "Firstname": '', "Lastname": '', "Position": '', "Password": ''});
                            }} className="red">Cancel</button>
                        </div>
                        </div>
                        
                    </div>
                : ''}
            {deletingUser ?
                <DeleteEmployee Employee={targetEmployee} setDeletingUser={setDeletingUser} type='home'/>
                : ''
            }
            <div className="ManageWrapper">
                <h2>Manage Employees</h2> 
                <div className="ManageListContainer">
                    <div className="ManageListInteractive">
                        <p>{state.branchData.length} Employees</p>
                        <div onClick={() => { setAddingUser(true);}} className="addItem">
                            <FontAwesomeIcon icon={faPlusCircle}/>
                            <p>ADD EMPLOYEE</p>
                        </div>
                    </div>
                    <div className="ManageListColumn Title">
                        <div className="columnID">Email</div>
                        <div className="columnName">Full Name</div>
                        <div className="columnPosition">Position</div>
                    </div>
                    {state.branchData.map(employee => {
                        return (
                            <Link className="linkedRow"
                                to={`/Employee/${employee.UserID}`}
                            >
                                <div className="ManageListColumn Employee">
                                    <div className="columnID">{employee.email}</div>
                                    <div className="columnName">{employee.Firstname + " " + employee.Lastname}</div>
                                    <div className="columnPosition">{employee.Position}</div>
                                    <div className="columnIcons">
                                        <div onClick={(ev) => { ev.preventDefault(); }}className="plus-wrapper">
                                            <FontAwesomeIcon className="plus" icon={faPlusSquare}/>
                                        </div>
                                        <div onClick={(ev) => { 
                                            ev.preventDefault();
                                            setTargetEmployee({UserID: employee.UserID, Name: employee.Firstname + ' ' + employee.Lastname});
                                            setDeletingUser(true);     
                                        }} className="trash-wrapper">
                                            <FontAwesomeIcon className="trash" icon={faTrashAlt}/>
                                        </div>
                                    </div>                     
                                </div>
                            </Link>
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