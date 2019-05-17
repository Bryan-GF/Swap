import React, {useEffect, useState, useContext} from 'react';
import {observer} from 'mobx-react-lite';
import { Route, Redirect } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import HomePage from './components/HomePage/Homepage';
import Calendar from './components/CalendarPage/Calendar';
import RequestListPage from './components/Requests/RequestsListPage';
import Login from './components/Authentication/Login';
import { GlobalStateContext } from './Stores/GlobalStore';
import {BasicAuthRoute, ManagerAuthRoute} from './components/Authentication/requireAuth';
import { VerifyToken } from './components/Authentication/VerifyToken';
import EmployeeProfile from './components/EmployeeProfile/EmployeeProfile';

const App = observer((props:any) => {
  const state = useContext(GlobalStateContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('Token');
    console.log(props.location)
    if(token) {
      VerifyToken(state, setLoading, token);
    } else {
      setLoading(false);
    }
    console.log(state);
  }, [])
  return (
    <div>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/Login" component={Login} />
      {!loading ?
        <div>
          <BasicAuthRoute exact path="/Home" component={HomePage} />       
          <BasicAuthRoute exact path="/Schedule" component={Calendar} />
          <BasicAuthRoute path="/Schedule/Requests" component={RequestListPage} />
          <ManagerAuthRoute path="/Employee/:UserID" component={EmployeeProfile}/>
        </div>
      : null}
    </div>
  );
});

export default App;
