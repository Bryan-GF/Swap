import React, {useContext} from 'react';
import {observer} from 'mobx-react-lite';
import { GlobalStateContext } from '../../Stores/GlobalStore';
import Nav from '../Navigation/Nav';

const HomePage = observer(() => {
    
    const state = useContext(GlobalStateContext);

    return (
        <div>
            <Nav/>
            <div>
                <h1>Homepage</h1>
                <p>{state.userData.name}</p>
            </div>
        </div>
    )
});

export default HomePage;