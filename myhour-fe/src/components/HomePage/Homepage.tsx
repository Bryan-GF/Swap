// Global State
import { GlobalStateContext } from '../../Stores/GlobalStore';

// Functional package imports
import React, {useContext, useEffect} from 'react';
import {observer} from 'mobx-react-lite';

// Components
import Nav from '../Navigation/Nav';
import ManagerHomePage from './ManagerHomePage';
import UserHomePage from './UserHomePage';
import OwnerHomePage from './OwnerHomePage';

// Component decides which component to show depending on role
const HomePage = observer((props:any) => {
    
    const state = useContext(GlobalStateContext);

    return (
        <div>
            <Nav/>
            {state.userData.roles === "Manager" ?
                <ManagerHomePage/> :
                (state.userData.roles === 'Owner' ?
                <OwnerHomePage/> :
                <UserHomePage/>)
            }
        </div>
    )
});

export default HomePage;