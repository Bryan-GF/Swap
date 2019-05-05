import React from 'react';
import {observer} from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import './Nav.css';
import logo from '../../assets/logo.png'

const Nav = observer(() => {
    return (
        <div className='navigation'>    
            <div className='navContent'>
                <img src={logo} alt='logo'/>
                <Link to='/Homepage'>Home</Link>
                <Link to='/Schedule'>Schedule</Link>
                <Link to='/Conversations'>Conversations</Link>
                <Link to='/Settings'>Settings</Link>
            </div>
        </div>
    )
});

export default Nav;