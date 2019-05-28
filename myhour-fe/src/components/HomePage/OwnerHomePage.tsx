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
    const [deletingManager, setDeletingManager] = useState(false);
    const [branchName, setBranchName] = useState('');
    const [targetBranch, setTargetBranch] = useState('');
    const [activeErrorsBranch, setActiveErrorsBranch] = useState(false)

    const handleBranchCreate = () => {
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

    const handleDelete = (ID) => {
        state.deleteBranch(ID);
        setDeletingBranch(false);
    }

    useEffect(() => {
        state.getManagers();
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
                            handleBranchCreate();
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
                                <div>
                                    <div className="ManageListColumn Employee">
                                        {deletingBranch ? 
                                            <div className='delete-confirmation-wrapper'>
                                                <div className='confirmation-info'>
                                                    <h2>Are you sure you want to delete {branch.Name}?</h2>
                                                </div>
                                                <div className='confirmation-buttons'>
                                                    <button onClick={() => { 
                                                            handleDelete(branch.branchID);
                                                        }} className='green'>Confirm</button>
                                                    <button onClick={() => { setDeletingBranch(false)}} className='red'>Cancel</button>
                                                </div>
                                            </div>
                                            :
                                            ''                
                                        }
                                        <div className="columnName">{branch.Name}</div>
                                        <div className="columnIcons">
                                            <div onClick={(ev) => { ev.preventDefault(); }}className="plus-wrapper">
                                                <FontAwesomeIcon className="plus" icon={faPlusSquare}/>
                                            </div>
                                            <div onClick={(ev) => { 
                                                ev.preventDefault();

                                                setDeletingBranch(true);     
                                            }} className="trash-wrapper">
                                                <FontAwesomeIcon className="trash" icon={faTrashAlt}/>
                                            </div>
                                        </div>                     
                                    </div>
                                    <div>
                                        {
                                            branch.branchID in state.BranchManagers ?
                                                state.BranchManagers[branch.branchID].map(manager => {
                                                    return (
                                                        <div>
                                                            <p>{manager.email}</p>
                                                            <div onClick={(ev) => { 
                                                                ev.preventDefault();
                                                                setDeletingManager(true);     
                                                            }} className="trash-wrapper">
                                                                <FontAwesomeIcon className="trash" icon={faTrashAlt}/>
                                                            </div>
                                                            {deletingManager ? 
                                                                <div className='delete-confirmation-wrapper'>
                                                                    <div className='confirmation-info'>
                                                                        <h2>Are you sure you want to delete {manager.Firstname}?</h2>
                                                                    </div>
                                                                    <div className='confirmation-buttons'>
                                                                        <button onClick={() => { 
                                                                                state.deleteManager(manager.UserID);
                                                                                setDeletingManager(false);
                                                                            }} className='green'>Confirm</button>
                                                                        <button onClick={() => { setDeletingManager(false)}} className='red'>Cancel</button>
                                                                    </div>
                                                                </div>
                                                                :
                                                                ''                
                                                            }
                                                        </div>
                                                    )
                                                })
                                            :
                                            null                                         

                                        }
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