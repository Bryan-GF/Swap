import React, {useContext, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import { GlobalStateContext } from '../../Stores/GlobalStore';
import moment from 'moment';
import {fixTime} from '../Requests/RequestHelper';

const UserHomePage = observer((props:any) => {
    
    const state = useContext(GlobalStateContext);

    useEffect(() => {
        state.getShifts(state.userData.UserID);  
    }, [])
    
    return (
        <div className="User-Homepage-Container">
            <div className="Shifts-Header">
                <h1>Shifts</h1>
                
            </div>
            <div className="Shifts-List">
                {state.currShifts.map((shift,i) => {
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
                            </div>        
                        </div>
                    )
                })}
            </div>
        </div>
    )
});

export default UserHomePage;