import React, {useContext, useState} from 'react';
import {observer} from 'mobx-react-lite';
import { GlobalStateContext } from '../../Stores/GlobalStore';
import logo from '../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import './Auth.css';
import axios from 'axios';

const Login= observer(() => {
    
    const state = useContext(GlobalStateContext);
    const [loginInfo, setLoginInfo] = useState({employeeID: '', password: ''});
    const [viewPass, setViewPass] = useState(false);
    console.log(state);

    const attemptLogin = () => {
        axios
        .post('https://swapapi.azurewebsites.net/api/AddCompany', { companyName: 'Google'})
        .then(response => 
            console.log(response)
        ).catch(error => console.log(error))
    }

    return (
        <div className='loginWrapper'>
            <div className='loginContainer'>
                <div className='logoWrapper'>
                    <img src={logo} alt='logo'/>
                    <span>Swap</span>
                </div>
                <div className='inputWrapper'>
                    
                        <input placeholder='Employee ID' onChange={(ev) => { setLoginInfo({...loginInfo, employeeID: ev.target.value})}}/>
                    <div className="passwordInput">
                        <input type={ viewPass ? 'text' : 'password'} placeholder='Password' onChange={(ev) => { setLoginInfo({...loginInfo, password: ev.target.value})}}/>
                        <div onClick={() => {setViewPass(!viewPass)}} className='toggleEye'>
                            <FontAwesomeIcon style={{color: (viewPass ? '#60B0F4' : '')}} icon={faEye} />
                        </div>
                    </div>
                </div>
                <button onClick={() => {attemptLogin()}}className='loginButton'>Login</button>
            </div>
        </div>
    )
});

export default Login;