import React, {useContext} from 'react';
import {observer} from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import './Nav.css';
import { GlobalStateContext } from '../../Stores/GlobalStore';
import logo from '../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router';

const Nav = observer((props:any) => {

    const state = useContext(GlobalStateContext);
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