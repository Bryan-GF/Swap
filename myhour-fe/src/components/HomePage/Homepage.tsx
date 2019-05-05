import React, {useContext} from 'react';
import {observer} from 'mobx-react-lite';
import { GlobalStateContext } from '../../Stores/GlobalStore';

const HomePage = observer(() => {
    
    const state = useContext(GlobalStateContext);

    return (
        <div>
            <h1>Homepage</h1>
            <p>{state.userData.name}</p>
        </div>
    )
});

export default HomePage;