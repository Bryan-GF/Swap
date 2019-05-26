import React, {useContext, useState} from 'react';
import {observer} from 'mobx-react-lite';
import { GlobalStateContext } from '../../Stores/GlobalStore';
import logo from '../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import './Auth.css';
import axios from 'axios';
import { withRouter } from 'react-router';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';


const Signup = observer((props:any) => {
    
    const state = useContext(GlobalStateContext);
    const [registerInfo, setRegisterInfo] = useState({Firstname: '', Lastname: '', "email": '', Password: '', ConfirmPassword: '', CompanyName: '', CompanyNumber: ''});
    const [viewPass, setViewPass] = useState(false);
    const [viewPass2, setViewPass2] = useState(false);

    const attemptRegister = () => {
        const {email, Firstname, Lastname, Password, ConfirmPassword, CompanyName, CompanyNumber} = registerInfo;
        let safeActive = {email: true, Firstname: false, Lastname: false, Password: false, ConfirmPassword: false, CompanyName: false, CompanyNumber: true}
        let newActive = {email: isEmail(email), 
            Firstname: Firstname.length === 0, 
            Lastname: Lastname.length === 0, 
            Password: Password.length < 7 && Password != ConfirmPassword, 
            ConfirmPassword: Password != ConfirmPassword, 
            CompanyName: CompanyName.length === 0, 
            CompanyNumber: isMobilePhone(CompanyNumber.replace(/-/g, ""), 'any')}
            console.log(newActive);
        if(JSON.stringify(safeActive) === JSON.stringify(newActive)) {
            console.log('PASSED');
        }
        
        console.log('FAILED')
    }

    return (
        <div className='signUpWrapper'>
                <h1>Business Registration</h1>
            <div className='signUpContainer'>
                <div className='inputWrapper'> 
                        <label>FIRST NAME *</label>    
                        <input className="nameInput" placeholder='ex. Jennifer' onChange={(ev) => { setRegisterInfo({...registerInfo, Firstname: ev.target.value})}}/>
                        <label>LAST NAME *</label>    
                        <input className="nameInput" placeholder='ex. Smith' onChange={(ev) => { setRegisterInfo({...registerInfo, Lastname: ev.target.value})}}/>
                        <label>CONTACT EMAIL *</label>    
                        <input className="emailInput" placeholder='ex. jenniferSmith@gmail.com' onChange={(ev) => { setRegisterInfo({...registerInfo, email: ev.target.value})}}/>
                        <label>CONTACT NUMBER *</label>    
                        <input className="contactInput" placeholder='ex. 123-123-1234' onChange={(ev) => { setRegisterInfo({...registerInfo, CompanyNumber: ev.target.value})}}/>
                        <label>ORGANIZATION NAME *</label>    
                        <input className="companyInput" placeholder="ex. Jennifer's Coffee" onChange={(ev) => { setRegisterInfo({...registerInfo, CompanyName: ev.target.value})}}/>
                    <div className="passwordInput">
                        <label>PASSWORD *</label> 
                        <input type={ viewPass ? 'text' : 'password'} placeholder='Enter your Password' onChange={(ev) => { setRegisterInfo({...registerInfo, Password: ev.target.value})}}/>
                        <div onClick={() => {setViewPass(!viewPass)}} className='toggleEye'>
                            <FontAwesomeIcon style={{color: (viewPass ? '#60B0F4' : '')}} icon={faEye} />
                        </div>
                        <label>CONFIRM PASSWORD *</label> 
                        <input type={ viewPass2 ? 'text' : 'password'} placeholder='Confirm your Password' onChange={(ev) => { setRegisterInfo({...registerInfo, ConfirmPassword: ev.target.value})}}/>
                        <div onClick={() => {setViewPass2(!viewPass2)}} className='toggleEye'>
                            <FontAwesomeIcon style={{color: (viewPass2 ? '#60B0F4' : '')}} icon={faEye} />
                        </div>
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