import React, {useContext} from 'react';
import {observer} from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import './Nav.css';
import { GlobalStateContext } from '../../Stores/GlobalStore';
import logo from '../../assets/logo.png'

const Nav = observer((props:any) => {

    const state = useContext(GlobalStateContext);
    console.log(state);
    return (
        <div className='navigation'>    
            <div className='navContent'>
                <div className='logo'>
                    <img src={logo} alt='logo'/>
                    <span>Swap</span>
                    <p>{state.userData.Position}</p>
                </div>
                {state.userData.Position === 'Branch Manager' ?
                    <Link to='/Manager/Home'>Home</Link> :
                    <Link to='/User/Home'>Home</Link>
                }
                
                <Link to='/Schedule'>Schedule</Link>
                <Link to='/Conversations'>Conversations</Link>
                <Link to='/Settings'>Settings</Link>
            </div>
        </div>
    )
});

export default Nav;