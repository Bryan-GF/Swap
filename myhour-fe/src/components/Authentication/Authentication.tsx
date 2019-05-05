import React, {useContext} from 'react';
import {observer} from 'mobx-react-lite';
import { GlobalStateContext } from '../../Stores/GlobalStore';
import { Link } from 'react-router-dom';

const Authentication = observer(() => {
    
    const state = useContext(GlobalStateContext);

    return (
        <div>
            <h1>Authentication</h1>
            <p>{state.userData.name}</p>
            <Link to='/Homepage'>Homepage</Link>
        </div>
    )
});

export default Authentication;