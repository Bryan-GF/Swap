// Global State
import { GlobalStateContext } from '../../Stores/GlobalStore';

// Functional package imports
import React, {useContext, useState} from 'react';
import {observer} from 'mobx-react-lite';
import { withRouter } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';

// Design
import './ResetPass.css';

// Components
import LandingNav from '../Navigation/LandingNav';

// Page for users to reset their passwords
const ResetPassword = observer((props:any) => {
    
    const state = useContext(GlobalStateContext);

    // Content Handler 
    const [passwordInfo, setPasswordInfo] = useState({email: '', oldPassword: '', newPassword: '', confirmNewPassword: ''});

    // Error Handlers
    const [errorHandler, setErrorHandler] = useState({email: true, oldPassword: true, newPassword: true, confirmNewPassword: true});

    const [loading, setLoading] = useState(false);
    

    // Accepts ev parameter. Attempts to use gobabl state function attemptReset to reset the users password.
    const handleReset = async(ev) => {
        ev.preventDefault();
        state.setUserData({...state.userData, email: passwordInfo.email});
        let safeInfo = await {email: true, oldPassword: true, newPassword: true, confirmNewPassword: true};
        let checkInfo = await {
                                email: isEmail(passwordInfo.email),
                                oldPassword: passwordInfo.oldPassword.length > 0, 
                                newPassword: passwordInfo.newPassword.length > 7, 
                                confirmNewPassword: passwordInfo.newPassword.length > 7 ? 
                                passwordInfo.confirmNewPassword === passwordInfo.newPassword : true };
        setErrorHandler(checkInfo);
        if(JSON.stringify(safeInfo) === JSON.stringify(checkInfo)) {
            setLoading(true);
            let status = await state.attemptReset(passwordInfo);
            setLoading(status);
            props.history.push('/Login');            
        }
    }

    return (
        <div>
            <LandingNav/>
            <div className='BufferReset'>
                <div className='ResetPassPage'>
                    <div className='Reset-Password'>
                        <h3>Reset Password</h3>
                        <form onSubmit={(ev) => { handleReset(ev)}}>
                            <label>Email</label>
                            <input type="text" name="email" onChange={(ev) => { setPasswordInfo({...passwordInfo, email: ev.target.value})}}/>
                            {!errorHandler.email ? <p>Please include a valid email.</p> : null}
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
    )
});

export default withRouter(ResetPassword);