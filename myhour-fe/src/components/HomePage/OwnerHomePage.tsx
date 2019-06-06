import React, {useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import { GlobalStateContext } from '../../Stores/GlobalStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlusSquare, faPlusCircle, faEye, faTimes} from '@fortawesome/free-solid-svg-icons';
import './Home.css';
import isEmail from 'validator/lib/isEmail';

const OwnerHomePage = observer((props:any) => {
    
    const state = useContext(GlobalStateContext);
    const [addingBranch, setAddingBranch] = useState(false);
    const [deletingBranch, setDeletingBranch] = useState(false);
    const [addingManager, setAddingManager] = useState(false);
    const [deletingManager, setDeletingManager] = useState(false);
    const [branchName, setBranchName] = useState('');
    const [targetBranch, setTargetBranch] = useState('');
    const [targetManager, setTargetManager] = useState('');
    const [activeErrorsBranch, setActiveErrorsBranch] = useState(false);
    const [managerInfo, setManagerInfo] = useState({Firstname: '', Lastname: '', email: '', Password: '', ConfirmPassword: '', branchID: ''});
    const [activeErrorsManager, setActiveErrorsManager] = useState({email: true, Firstname: false, Lastname: false, Password: false, ConfirmPassword: false});
    const [viewPass, setViewPass] = useState(false);
    const [viewPass2, setViewPass2] = useState(false);

    const handleBranchCreate = () => {
        let status = (branchName.length === 0);
        setActiveErrorsBranch(status);
        if(!status) {
            console.log(state.userData.CompanyID);
            console.log(branchName)
            state.addBranch(branchName);
            setAddingBranch(false);
            setBranchName('');
            setActiveErrorsBranch(false);
        }
    }

    const attemptManagerAdd = async() => {

        const {email, Firstname, Lastname, Password, ConfirmPassword} = managerInfo;
        let safeActive = {email: true, Firstname: false, Lastname: false, Password: false, ConfirmPassword: false}
        let newActive = {
            email: isEmail(email), 
            Firstname: Firstname.length === 0, 
            Lastname: Lastname.length === 0, 
            Password: Password.length < 7, 
            ConfirmPassword: Password != ConfirmPassword
        }
        setActiveErrorsManager(newActive)
        if(JSON.stringify(safeActive) === JSON.stringify(newActive)) {
            
            let status = await state.addManager(managerInfo);
            if(status) {
                setAddingManager(false);
                setActiveErrorsManager({email: true, Firstname: false, Lastname: false, Password: false, ConfirmPassword: false});
                setManagerInfo({Firstname: '', Lastname: '', email: '', Password: '', ConfirmPassword: '', branchID: ''});
            }
            
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
                <div className='popupWrapper'>
                    <div className='inputWrapper'>
                        <h2>Add Branch</h2>
                            <label>Branch Name</label>
                            <input type="text" onChange={(ev) => {setBranchName(ev.target.value)}}/>
                            {activeErrorsBranch ? <p>Please include a Branch Name.</p> : null}
                        <div className='confirmation-buttons'>
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
                            <div onClick={() => { setAddingBranch(true)}} className="addItem">
                                <FontAwesomeIcon icon={faPlusCircle}/>
                                <p>ADD BRANCH</p>
                            </div>
                        </div>
                        {state.BranchList.map(branch => {
                            return (
                                <div>
                                    <div className="ManageListColumn">
                                        {deletingBranch && targetBranch === branch.branchID ? 
                                            <div className='popupWrapper'>
                                                <div className='delete-container'>
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
                                            </div>
                                            :
                                            ''                
                                        }
                                        {addingManager && branch.branchID === managerInfo.branchID ? 
                                            <div className='popupWrapper'>
                                                <div className='inputWrapper'>
                                                    <h2>Branch Creator</h2>
                                                    <label>FIRST NAME *</label>    
                                                    <input className="nameInput" placeholder='ex. Jennifer' onChange={(ev) => { setManagerInfo({...managerInfo, Firstname: ev.target.value})}}/>
                                                    {activeErrorsManager.Firstname ? <p>Please include a first name.</p> : null}
                                                    <label>LAST NAME *</label>    
                                                    <input className="nameInput" placeholder='ex. Smith' onChange={(ev) => { setManagerInfo({...managerInfo, Lastname: ev.target.value})}}/>
                                                    {activeErrorsManager.Lastname ? <p>Please include a last name.</p> : null}
                                                    <label>EMAIL *</label>    
                                                    <input className="emailInput" placeholder='ex. jenniferSmith@gmail.com' onChange={(ev) => { setManagerInfo({...managerInfo, email: ev.target.value})}}/>
                                                    {!activeErrorsManager.email ? <p>Please include a valid email address.</p> : null}
                                                    <div className="passwordInput">
                                                        <label>PASSWORD *</label> 
                                                        <div className="passwordInputInner">
                                                            <input type={ viewPass ? 'text' : 'password'} placeholder='Enter your Password' onChange={(ev) => { setManagerInfo({...managerInfo, Password: ev.target.value})}}/>
                                                            <div onClick={() => {setViewPass(!viewPass)}} className='toggleEye'>
                                                                <FontAwesomeIcon style={{color: (viewPass ? '#60B0F4' : '')}} icon={faEye} />
                                                            </div>
                                                        </div>
                                                        {activeErrorsManager.Password ? <p>Password too short. Must be minimum 7 characters.</p> : null}
                                                    </div>
                                                    <div className="passwordInput">
                                                        <label>CONFIRM PASSWORD *</label> 
                                                        <div className="passwordInputInner">
                                                            <input type={ viewPass2 ? 'text' : 'password'} placeholder='Confirm your Password' onChange={(ev) => { setManagerInfo({...managerInfo, ConfirmPassword: ev.target.value})}}/>
                                                            <div onClick={() => {setViewPass2(!viewPass2)}} className='toggleEye'>
                                                                <FontAwesomeIcon style={{color: (viewPass2 ? '#60B0F4' : '')}} icon={faEye} />
                                                            </div>
                                                        </div>
                                                        {activeErrorsManager.ConfirmPassword ? <p>Passwords do not match.</p> : null}
                                                    </div>
                                                    <div className='confirmation-buttons'>
                                                        <button onClick={() => {
                                                            attemptManagerAdd();
                                                        }} className="green">Create</button>
                                                        <button onClick={() => {
                                                            setAddingManager(false);
                                                            setActiveErrorsManager({email: true, Firstname: false, Lastname: false, Password: false, ConfirmPassword: false});
                                                            setManagerInfo({Firstname: '', Lastname: '', email: '', Password: '', ConfirmPassword: '', branchID: ''});
                                                        }} className="red">Cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            ''
                                        }
                                        <div className="row">
                                            <h3>{branch.Name}</h3>
                                            <div className="columnIcons">
                                                <div onClick={(ev) => { 
                                                    ev.preventDefault(); 
                                                    setManagerInfo({...managerInfo, branchID: branch.branchID});
                                                    setAddingManager(true);
                                                }}className="plus-wrapper">
                                                    <FontAwesomeIcon className="plus" icon={faPlusSquare}/>
                                                </div>
                                                <div onClick={(ev) => { 
                                                    ev.preventDefault();
                                                    setTargetBranch(branch.branchID);
                                                    setDeletingBranch(true);     
                                                }} className="trash-wrapper">
                                                    <FontAwesomeIcon className="trash" icon={faTrashAlt}/>
                                                </div>
                                            </div>   
                                        </div>                  
                                    </div>
                                    <div>
                                        {
                                            branch.branchID in state.BranchManagers ?
                                                state.BranchManagers[branch.branchID].map(manager => {
                                                    return (
                                                        <div className="managerRow">
                                                            <div className="managerInfo">
                                                                <span>Name:</span>
                                                                <p>{`${manager.Firstname} ${manager.Lastname}`}</p>
                                                                <span>Email:</span>
                                                                <p>{manager.email}</p>

                                                            </div>
                                                            <div onClick={(ev) => { 
                                                                ev.preventDefault();
                                                                setTargetManager(manager.UserID);
                                                                setDeletingManager(true);     
                                                            }} className="trash-wrapper">
                                                                <FontAwesomeIcon className="times" icon={faTimes}/>
                                                            </div>
                                                            {deletingManager && targetManager === manager.UserID ? 
                                                                <div className='popupWrapper'>
                                                                    <div className='delete-container'>
                                                                        <div className='confirmation-info'>
                                                                            <h2>Are you sure you want to delete {manager.Firstname}?</h2>
                                                                        </div>
                                                                        <div className='confirmation-buttons'>
                                                                            <button onClick={() => { 
                                                                                    state.deleteManager(manager.UserID, branch.branchID);
                                                                                    setDeletingManager(false);
                                                                                }} className='green'>Confirm</button>
                                                                            <button onClick={() => { setDeletingManager(false)}} className='red'>Cancel</button>
                                                                        </div>
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
                                        <div className="manageRowFiller">
                                        </div>
                                    </div>
                                </div>

                            )
                        })}
                        
                    </div>
                </div>
            </div>
        </div>
    )
});

export default OwnerHomePage;