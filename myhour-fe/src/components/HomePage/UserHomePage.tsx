// Global State
import { GlobalStateContext } from '../../Stores/GlobalStore';

// Functional package imports
import React, {useContext, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {fixTime} from '../Requests/RequestHelper';
import { Link } from 'react-router-dom';

// Lists all of users shifts and their request status.
const UserHomePage = observer((props:any) => {
    
    const state = useContext(GlobalStateContext);

    // On component did mount make call to global state functions getShifts and getUserRequests.
    useEffect(() => {
        state.getShifts(state.userData.UserID);
        state.getUserRequests();
        state.createChatter('test', 'test@gmail.com');
    }, [])
    
    return (
        <div className="User-Homepage-Container">
            <div className="Shifts-Header">
                <h1>Shifts</h1>
                
            </div>
            <div className="Shifts-List">
                {state.currShifts.map((shift,i) => {
                    let date = shift.shiftDate.substring(0, 10);
                    if(date.charAt(9) != ' ') {
                        date = date.substring(0, 8);
                    }
                    date = date.trim();
                    console.log(date);
                    let newTime = fixTime(shift.startTime, shift.endTime);
                    return (
                        <div>
                            <div className="Shifts-Row">
                                <p className="num">{i + 1}</p>
                                <span>Date: </span>
                                <p>{shift.shiftDate.split(" ")[0]}</p>
                                <span>Start Time: </span>
                                <p>{newTime.startTime}</p>
                                <span>End Time: </span>
                                <p>{newTime.endTime}</p>
                                <div className="Row-Buttons">
                                    {state.userRequests[shift.ShiftID] ? 
                                        <Link to={{ pathname: "/Requests/List", search: `date=${date}`}}>
                                            <button className="Active-Button">Active Requests</button>
                                        </Link>
                                        : 
                                        <Link to={{ pathname: "/Requests/List", search: `date=${date}`}}>
                                            <button className="Add-Button">Create Request</button>
                                        </Link>
                                    }
                                </div>
                            </div>        
                        </div>
                    )
                })}
            </div>
        </div>
    )
});

export default UserHomePage;