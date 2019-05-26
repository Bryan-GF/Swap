import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import logo from '../../assets/logo.png'

const LandingNav = () => {
    return (
        <div className='navigation'>    
            <div className='navContent landing'>
                <div className='logo'>
                    <img src={logo} alt='logo'/>
                    <span>Swap</span>
                </div>
                <div className='landingButtons'>
                    <Link to='/Login'>
                        <div className='loginButton'>Login</div>
                    </Link>
                    <Link to='/Register'>
                        <div className='signUpButton'>Sign Up</div>
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default LandingNav;