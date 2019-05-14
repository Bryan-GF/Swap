import React, {useContext, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import { GlobalStateContext } from '../../Stores/GlobalStore';

const ManagerHomePage = observer((props:any) => {
    
    const state = useContext(GlobalStateContext);

    
    return (
        <div>
            <div>
                <h1>Manager Homepage</h1>
            </div>
        </div>
    )
});

export default ManagerHomePage;