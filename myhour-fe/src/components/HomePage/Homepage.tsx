import React, {useContext, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import { GlobalStateContext } from '../../Stores/GlobalStore';
import Nav from '../Navigation/Nav';

const HomePage = observer((props:any) => {
    
    const state = useContext(GlobalStateContext);

    
    return (
        <div>
            <Nav/>
            <div>
                <h1>Homepage</h1>
            </div>
        </div>
    )
});

export default HomePage;