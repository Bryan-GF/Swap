import React, {useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import { GlobalStateContext } from '../../Stores/GlobalStore';

const OwnerHomePage = observer((props:any) => {
    
    const state = useContext(GlobalStateContext);

    useEffect(() => {
        
    }, [])
    
    return (
        <div className="Owner-HomePage-Container">
            OWNER
        </div>
    )
});

export default OwnerHomePage;