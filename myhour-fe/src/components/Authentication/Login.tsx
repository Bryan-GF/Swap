import React, {useContext, useState} from 'react';
import {observer} from 'mobx-react-lite';
import { GlobalStateContext } from '../../Stores/GlobalStore';
import logo from '../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import './Auth.css';
import axios from 'axios';
import { withRouter } from 'react-router';


const Login= observer((props:any) => {
    
    const state = useContext(GlobalStateContext);
    const [loginInfo, setLoginInfo] = useState({email: '', Password: ''});
    const [viewPass, setViewPass] = useState(false);
    const [loading, setLoading] = useState(false);

    const attemptLogin = async() => {
        setLoading(true);
        let status = await state.attemptLogin(loginInfo);
        if(status) {
            props.history.push('/Home');
        }
        setLoading(false);
    }

    return (
        <div className='loginWrapper'>
            <div className='loginContainer'>
                <div className='logoWrapper'>
                    <img src={logo} alt='logo'/>
                    <span>Swap</span>
                </div>
                <div className='personalInputWrapper'>     
                        <input className="employeeInput" placeholder='Email' onChange={(ev) => { setLoginInfo({...loginInfo, email: ev.target.value})}}/>
                    <div className="passwordInput">
                        <input type={ viewPass ? 'text' : 'password'} placeholder='Password' onChange={(ev) => { setLoginInfo({...loginInfo, Password: ev.target.value})}}/>
                        <div onClick={() => {setViewPass(!viewPass)}} className='toggleEye'>
                            <FontAwesomeIcon style={{color: (viewPass ? '#60B0F4' : '')}} icon={faEye} />
                        </div>
                    </div>
                </div>
                {state.incorrectPassword ? <p>Incorrect email or password.</p> : null}
                <div className="loginButton" onClick={() => { attemptLogin()}}>
                    {loading ?
                        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                        :
                        'Login'
                    }
                </div>
            </div>
        </div>
    )
});

export default withRouter(Login);