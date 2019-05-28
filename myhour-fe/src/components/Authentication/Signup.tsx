import React, {useContext, useState} from 'react';
import {observer} from 'mobx-react-lite';
import { GlobalStateContext } from '../../Stores/GlobalStore';
import logo from '../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import './Auth.css';
import { withRouter } from 'react-router';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';


const Signup = observer((props:any) => {
    
    const state = useContext(GlobalStateContext);
    const [registerInfo, setRegisterInfo] = useState({Firstname: '', Lastname: '', email: '', Password: '', ConfirmPassword: '', CompanyName: '', CompanyNumber: ''});
    const [viewPass, setViewPass] = useState(false);
    const [viewPass2, setViewPass2] = useState(false);
    const [activeErrors, setActiveErrors] = useState({email: true, Firstname: false, Lastname: false, Password: false, ConfirmPassword: false, CompanyNumber: true, CompanyName: false})

    const attemptRegister = async() => {
        const {email, Firstname, Lastname, Password, ConfirmPassword, CompanyName, CompanyNumber} = registerInfo;
        let safeActive = {email: true, Firstname: false, Lastname: false, Password: false, ConfirmPassword: false, CompanyName: false, CompanyNumber: true}
        let newActive = {email: isEmail(email), 
            Firstname: Firstname.length === 0, 
            Lastname: Lastname.length === 0, 
            Password: Password.length < 7, 
            ConfirmPassword: Password != ConfirmPassword, 
            CompanyName: CompanyName.length === 0, 
            CompanyNumber: isMobilePhone(CompanyNumber.replace(/-/g, ""), 'any')}
        setActiveErrors(newActive)
        if(JSON.stringify(safeActive) === JSON.stringify(newActive)) {
            let status = await state.addCompany(registerInfo);
            if(status) {
                state.setUserData({UserID: status.UserID , email : email,  Firstname: Firstname, Lastname: Lastname, Position: "Company Ownder", branchID: "", CompanyID: status.CompanyID, roles: "Owner"});
                state.setLoginStatus(true);
                props.history.push('/Home');

            }
        } 
    }

    return (
        <div className='signUpWrapper'>
                <h1>Business Registration</h1>
            <div className='signUpContainer'>
                <h5>Note: If you are an employee, request your account information from your manager or similar.</h5>
                <div className='inputWrapper'> 
                        <label>FIRST NAME *</label>    
                        <input className="nameInput" placeholder='ex. Jennifer' onChange={(ev) => { setRegisterInfo({...registerInfo, Firstname: ev.target.value})}}/>
                        {activeErrors.Firstname ? <p>Please include a first name.</p> : null}
                        <label>LAST NAME *</label>    
                        <input className="nameInput" placeholder='ex. Smith' onChange={(ev) => { setRegisterInfo({...registerInfo, Lastname: ev.target.value})}}/>
                        {activeErrors.Lastname ? <p>Please include a last name.</p> : null}
                        <label>CONTACT EMAIL *</label>    
                        <input className="emailInput" placeholder='ex. jenniferSmith@gmail.com' onChange={(ev) => { setRegisterInfo({...registerInfo, email: ev.target.value})}}/>
                        {!activeErrors.email ? <p>Please include a valid email address.</p> : null}
                        <label>CONTACT NUMBER *</label>    
                        <input className="contactInput" placeholder='ex. 123-123-1234' onChange={(ev) => { setRegisterInfo({...registerInfo, CompanyNumber: ev.target.value})}}/>
                        {!activeErrors.CompanyNumber ? <p>Please include a valid phone number.</p> : null}
                        <label>ORGANIZATION NAME *</label>    
                        <input className="companyInput" placeholder="ex. Jennifer's Coffee" onChange={(ev) => { setRegisterInfo({...registerInfo, CompanyName: ev.target.value})}}/>
                        {activeErrors.CompanyName ? <p>Please include an organization name.</p> : null}
                    <div className="passwordInput">
                        <label>PASSWORD *</label> 
                        <div className="passwordInputInner">
                            <input type={ viewPass ? 'text' : 'password'} placeholder='Enter your Password' onChange={(ev) => { setRegisterInfo({...registerInfo, Password: ev.target.value})}}/>
                            <div onClick={() => {setViewPass(!viewPass)}} className='toggleEye'>
                                <FontAwesomeIcon style={{color: (viewPass ? '#60B0F4' : '')}} icon={faEye} />
                            </div>
                        </div>
                        {activeErrors.Password ? <p>Password too short. Must be minimum 7 characters.</p> : null}
                    </div>
                    <div className="passwordInput">
                        <label>CONFIRM PASSWORD *</label> 
                        <div className="passwordInputInner">
                            <input type={ viewPass2 ? 'text' : 'password'} placeholder='Confirm your Password' onChange={(ev) => { setRegisterInfo({...registerInfo, ConfirmPassword: ev.target.value})}}/>
                            <div onClick={() => {setViewPass2(!viewPass2)}} className='toggleEye'>
                                <FontAwesomeIcon style={{color: (viewPass2 ? '#60B0F4' : '')}} icon={faEye} />
                            </div>
                        </div>
                        {activeErrors.ConfirmPassword ? <p>Passwords do not match.</p> : null}
                    </div>
                </div>
                <div className='registerButtons'>
                    <button onClick={() => {attemptRegister()}}className='register'>Register</button>
                    <button onClick={() => {}} className='cancel'>Cancel</button>
                </div>
            </div>
        </div>
    )
});

export default withRouter(Signup);