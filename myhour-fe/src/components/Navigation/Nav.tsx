// Global State
import { GlobalStateContext } from '../../Stores/GlobalStore';

// Functional package imports
import React, {useContext} from 'react';
import {observer} from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

// Design
import './Nav.css';
import logo from '../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

// Navigation for non landing nav pages when user is logged in.
const Nav = observer((props:any) => {

    const state = useContext(GlobalStateContext);

    // Deletes the access token from local storage and sets global state loginStatus value to false.
    const handleLogout = () => {
        localStorage.removeItem("Token");
        state.setLoginStatus(false);
        props.history.push('/Login');
    }

    return (
        <div className='navigation'>    
            <div className='navContent'>
                <div className="bufferLogo">
                    <Link to='/Home'>
                        <div className='logo'>
                            <img src={logo} alt='logo'/>
                            <span>Swap</span>
                        </div>
                    </Link>
                </div>
                <div>
                    <Link to='/Home'>Home</Link> 
                    {state.userData.roles === 'Owner' || state.userData.roles === 'Manager' ?
                    null
                    :
                    <Link to='/Requests'>Requests</Link>
                    }                   
                    <Link to='/Conversations'>Conversations</Link>
                    <Link to='/Settings'>Settings</Link>
                </div>
                <div className="logoutIcon" onClick={() => {handleLogout()}}>
                    <FontAwesomeIcon icon={faSignOutAlt}/>
                </div>
            </div>
        </div>
    )
});

export default withRouter(Nav);