import React, {useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import { GlobalStateContext } from '../../Stores/GlobalStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlusSquare, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './Home.css';

const OwnerHomePage = observer((props:any) => {
    
    const state = useContext(GlobalStateContext);
    const [addingBranch, setAddingBranch] = useState(false);
    const [deletingBranch, setDeletingBranch] = useState(false);
    const [branchName, setBranchName] = useState('');
    const [activeErrorsBranch, setActiveErrorsBranch] = useState(false)

    const hanldeBranchCreate = () => {
        let status = (branchName.length === 0);
        setActiveErrorsBranch(status);
        console.log(status);
        if(!status) {
            state.addBranch(branchName);
            setAddingBranch(false);
            setBranchName('');
            setActiveErrorsBranch(false);
        }
    }

    useEffect(() => {
        state.getAllBranches();
    }, [])
    
    return (
        <div>
            {addingBranch ? 
                <div className='employee-adder-wrapper'>
                    <h2>Add Branch</h2>
                    <div className='adder-content'>
                        <span>Branch Name</span>
                        <input type="text" onChange={(ev) => {setBranchName(ev.target.value)}}/>
                        {activeErrorsBranch ? <p>Please include a Branch Name.</p> : null}
                    </div>
                    <div className='employee-adder-buttons'>
                        <button onClick={() => {
                            hanldeBranchCreate();
                        }} className="green">Create</button>
                        <button onClick={() => {
                            setAddingBranch(false);
                            setActiveErrorsBranch(false);
                            setBranchName('');
                        }} className="red">Cancel</button>
                    </div>
                </div>
                :
                ''
            }
            <div className="Owner-Homepage-Container">
                <div className="OwnerWrapper">
                    <h2>Manage Branches</h2> 
                    <div className="OwnerListContainer">
                        <div className="ManageListInteractive">
                            <p>{state.BranchList.length} Branches</p>
                            <div onClick={() => { setAddingBranch(true)}} className="addBranch">
                                <FontAwesomeIcon icon={faPlusCircle}/>
                                <p>ADD BRANCH</p>
                            </div>
                        </div>
                        {state.BranchList.map(branch => {
                            return (
                                <div className="ManageListColumn Employee">
                                    <div className="columnName">{branch.Name}</div>
                                    <div className="columnIcons">
                                        <div onClick={(ev) => { ev.preventDefault(); }}className="plus-wrapper">
                                            <FontAwesomeIcon className="plus" icon={faPlusSquare}/>
                                        </div>
                                        <div onClick={(ev) => { 
                                            ev.preventDefault();
                                            //setTargetEmployee({UserID: employee.UserID, Name: employee.Firstname + ' ' + employee.Lastname});
                                            //setDeletingUser(true);     
                                        }} className="trash-wrapper">
                                            <FontAwesomeIcon className="trash" icon={faTrashAlt}/>
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
        </div>
    )
});

export default OwnerHomePage;