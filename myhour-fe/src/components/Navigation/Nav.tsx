import React from 'react';
import {observer} from 'mobx-react-lite';
import { Link } from 'react-router-dom';

const Nav = observer(() => {

    return (
        <div style={{'display': 'flex'}}>
            <Link to='/Homepage'>Homepage</Link>
            <Link to='/Calendar'>Calendar</Link>
        </div>
    )
});

export default Nav;