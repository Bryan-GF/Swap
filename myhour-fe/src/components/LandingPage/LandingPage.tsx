import React, {useContext} from 'react';
import {observer} from 'mobx-react-lite';
import { GlobalStateContext } from '../../Stores/GlobalStore';
import { Link } from 'react-router-dom';

const LandingPage = observer(() => {
    
    const state = useContext(GlobalStateContext);

    return (
        <div>
            <h1>LandingPage</h1>
            <p>{state.userData.name}</p>
            <Link to='/Authentication'>Authentication</Link>
        </div>
    )
});

export default LandingPage;