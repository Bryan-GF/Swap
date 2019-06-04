import React, {useContext, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import { GlobalStateContext } from '../../Stores/GlobalStore';
import { Link } from 'react-router-dom';
import Nav from '../Navigation/Nav';
import './Settings.css'

const Settings = observer((props:any) => {
    
    return (
        <div>
            <Nav/>
            <div className='buffer'>
                <div className='Settings-Container'>
                    <h2>Settings</h2>
                    <div className='Settings-Content'>
                        <div className='Reset-Password'>
                            <h3>Reset Password</h3>
                            <form>
                                <label>Old Password</label>
                                <input type="password" name="oldpassword" />
                                <label>New Password</label>
                                <input type="password" name="newpassword" />
                                <label>Confirm New Password</label>
                                <input type="password" name="confirmpassword" />
                                <input className="Reset-Button" type="submit" value="Reset"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
});

export default Settings;