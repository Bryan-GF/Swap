import React, {useEffect, useState, useContext} from 'react';
import {observer} from 'mobx-react-lite';
import { Route, Redirect } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import HomePage from './components/HomePage/Homepage';
import ManagerHomePage from './components/HomePage/ManagerHomePage';
import Calendar from './components/CalendarPage/Calendar';
import RequestListPage from './components/Requests/RequestsListPage';
import Login from './components/Authentication/Login';
import { GlobalStateContext } from './Stores/GlobalStore';
import {BasicAuthRoute} from './components/Authentication/requireAuth';
import { VerifyToken } from './components/Authentication/VerifyToken';

const App = observer((props:any) => {
  const state = useContext(GlobalStateContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    VerifyToken(state, setLoading);
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
        </div>
      : null}
    </div>
  );
});

export default App;
