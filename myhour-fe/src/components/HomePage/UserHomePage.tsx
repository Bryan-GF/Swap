import React, {useContext, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import { GlobalStateContext } from '../../Stores/GlobalStore';

const UserHomePage = observer((props:any) => {
    
    const state = useContext(GlobalStateContext);

    
    return (
        <div>
            <div>
                <h1>User Homepage</h1>
            </div>
        </div>
    )
});

export default UserHomePage;