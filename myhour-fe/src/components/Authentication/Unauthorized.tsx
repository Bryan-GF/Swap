import React, {useContext, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import { GlobalStateContext } from '../../Stores/GlobalStore';
import { Link } from 'react-router-dom';

const Unauthorized = observer((props:any) => {
    
    return (
        <div className='Unauthorized-Container'>
            <h1>Unauthorized Access</h1>
            <p>You don't have the proper credentials to access this page.</p>
            <Link to='/Home'>Return to Homepage</Link>
        </div>
    )
});

export default Unauthorized;