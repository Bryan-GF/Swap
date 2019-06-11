import React, {useContext, useState} from 'react';
import {observer} from 'mobx-react-lite';
import { GlobalStateContext } from '../../Stores/GlobalStore';
import Nav from '../Navigation/Nav';
import './Settings.css';
import { loadingIndicatorCSS } from 'react-select/lib/components/indicators';


const Settings = observer((props:any) => {

    const state = useContext(GlobalStateContext);
    const [passwordInfo, setPasswordInfo] = useState({oldPassword: '', newPassword: '', confirmNewPassword: ''});
    const [errorHandler, setErrorHandler] = useState({oldPassword: true, newPassword: true, confirmNewPassword: true});
    const [loading, setLoading] = useState(false);
    
    const handleReset = async(ev) => {
        ev.preventDefault();
        console.log("HEY");
        let safeInfo = await {oldPassword: true, newPassword: true, confirmNewPassword: true};
        let checkInfo = await {oldPassword: passwordInfo.oldPassword.length > 0, 
                                newPassword: passwordInfo.newPassword.length > 7, 
                                confirmNewPassword: passwordInfo.newPassword.length > 7 ? 
                                passwordInfo.confirmNewPassword === passwordInfo.newPassword : true };
        setErrorHandler(checkInfo);
        if(JSON.stringify(safeInfo) === JSON.stringify(checkInfo)) {
            setLoading(true);
            console.log("Attempt");
            let status = await state.attemptReset(passwordInfo);
            setLoading(status);
            
        }
    }
    return (
        <div>
            <Nav/>
            <div className='buffer'>
                <div className='Settings-Container'>
                    <h2>Settings</h2>
                    <div className='Settings-Content'>
                        <div className='Reset-Password'>
                            <h3>Reset Password</h3>
                            <form onSubmit={(ev) => { handleReset(ev)}}>
                                <label>Old Password</label>
                                <input type="password" name="oldpassword" onChange={(ev) => { setPasswordInfo({...passwordInfo, oldPassword: ev.target.value})}}/>
                                {state.incorrectPassword ? <p>Incorrect password</p> : (!errorHandler.oldPassword ? <p>Previous password required.</p> : null)}
                                <label>New Password</label>
                                <input type="password" name="newpassword" onChange={(ev) => { setPasswordInfo({...passwordInfo, newPassword: ev.target.value})}}/>
                                {!errorHandler.newPassword ? <p>New password must be at least 7 characters.</p> : null}
                                <label>Confirm New Password</label>
                                <input type="password" name="confirmpassword" onChange={(ev) => { setPasswordInfo({...passwordInfo, confirmNewPassword: ev.target.value})}}/>
                                {!errorHandler.confirmNewPassword ? <p>Passwords do not match.</p> : null}
                                <div className="Reset-Button" onClick={(ev) => { handleReset(ev)}}>
                                    {loading ?
                                        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                                        :
                                        'Reset'
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
});

export default Settings;