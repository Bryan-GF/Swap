import React, {useContext} from 'react';
import {observer} from 'mobx-react-lite';
import { GlobalStateContext } from '../../Stores/GlobalStore';
import { Link } from 'react-router-dom';
import LandingNav from '../Navigation/LandingNav';

const LandingPage = observer(() => {
    
    const state = useContext(GlobalStateContext);

    return (
        <div>
            <LandingNav/>
            <div>
                <h1>LandingPage</h1>
                <Link to='/Authentication'>Authentication</Link>
            </div>
        </div>
    )
});

export default LandingPage;