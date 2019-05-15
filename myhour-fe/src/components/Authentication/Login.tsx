import React, {useContext, useState} from 'react';
import {observer} from 'mobx-react-lite';
import { GlobalStateContext } from '../../Stores/GlobalStore';
import logo from '../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import './Auth.css';
import axios from 'axios';
import Select from 'react-select';
import { withRouter } from 'react-router';


const Login= observer((props:any) => {
    
    const state = useContext(GlobalStateContext);
    const [loginInfo, setLoginInfo] = useState({employeeID: '', Password: '', Companyname: ''});
    const [viewPass, setViewPass] = useState(false);
    console.log(state);

    const options = [
        { value: 'Target', label: 'Target' },
        { value: 'Microsoft', label: 'Microsoft' },
        { value: 'Google', label: 'Google' }
    ]

    const attemptLogin = () => {
        axios
        .post('https://swapapi.azurewebsites.net/api/Authenticate', loginInfo)
        .then(res => {
            console.log(res.data);
            localStorage.setItem('Token', res.data.Token);
            let User = {"employeeID": res.data.employeeID, "Firstname": res.data.Firstname, "Lastname": res.data.Lastname, "Position": res.data.Position, "branchID": res.data.branchID}
            state.setUserData(User);
            state.setLoginStatus(true);
            props.history.push('/Home');           
        }).catch(err => console.log(err))
    }

    return (
        <div className='loginWrapper'>
            <div className='loginContainer'>
                <div className='logoWrapper'>
                    <img src={logo} alt='logo'/>
                    <span>Swap</span>
                </div>
                <div className='inputWrapper'>     
                        <input className="employeeInput" placeholder='Employee ID' onChange={(ev) => { setLoginInfo({...loginInfo, employeeID: ev.target.value})}}/>
                    <div className="passwordInput">
                        <input type={ viewPass ? 'text' : 'password'} placeholder='Password' onChange={(ev) => { setLoginInfo({...loginInfo, Password: ev.target.value})}}/>
                        <div onClick={() => {setViewPass(!viewPass)}} className='toggleEye'>
                            <FontAwesomeIcon style={{color: (viewPass ? '#60B0F4' : '')}} icon={faEye} />
                        </div>
                    </div>
                    <div className="companyInfo"> 
                        <Select onChange={(value:any) => { setLoginInfo({...loginInfo, Companyname: value.label})}} className="companySelect" classNamePrefix="company" options={options}/>
                    </div>
                </div>
                <button onClick={() => {attemptLogin()}}className='loginButton'>Login</button>
            </div>
        </div>
    )
});

export default withRouter(Login);