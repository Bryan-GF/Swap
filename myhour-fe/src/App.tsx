import React, {useEffect, useContext} from 'react';
import {observer} from 'mobx-react-lite';
import { Route, Redirect } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import HomePage from './components/HomePage/Homepage';
import Calendar from './components/CalendarPage/Calendar';
import RequestListPage from './components/Requests/RequestsListPage';
import Login from './components/Authentication/Login';
import { GlobalStateContext } from './Stores/GlobalStore';
import {ProtectedRoute} from './components/Authentication/requireAuth';
const App = observer((props:any) => {
  const state = useContext(GlobalStateContext);

  

  return (
    <div>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/Login" component={Login} />
      <Route exact path="/User/Home" component={HomePage} />
      <Route exact path="/Manager/Home" component={HomePage} />
      <Route exact path="/Schedule" component={Calendar} />
      <Route path="/Schedule/Requests" component={RequestListPage} />
      <ProtectedRoute exact path="/Homer" component={Calendar}/>
    </div>
  );
});

export default App;
