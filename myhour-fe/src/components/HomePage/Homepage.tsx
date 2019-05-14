import React, {useContext, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import { GlobalStateContext } from '../../Stores/GlobalStore';
import Nav from '../Navigation/Nav';
import ManagerHomePage from './ManagerHomePage';
import UserHomePage from './UserHomePage';

const HomePage = observer((props:any) => {
    
    const state = useContext(GlobalStateContext);

    return (
        <div>
            <Nav/>
            {state.userData.Position === "Branch Manager" ?
                <ManagerHomePage/> :
                <UserHomePage/>
            }
        </div>
    )
});

export default HomePage;