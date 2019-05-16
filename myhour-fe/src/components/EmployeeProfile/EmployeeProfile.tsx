import React, {useContext, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import { GlobalStateContext } from '../../Stores/GlobalStore';

const EmployeeProfile = observer((props:any) => {
    
    const state = useContext(GlobalStateContext);

    
    return (
        <div>
            <div>
                <h1>Employee Profile</h1>
            </div>
        </div>
    )
});

export default EmployeeProfile;