import React, {useEffect, useContext} from 'react';
import {observer} from 'mobx-react-lite';
import { Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import HomePage from './components/HomePage/Homepage';
import Calendar from './components/CalendarPage/Calendar';
import RequestListPage from './components/Requests/RequestsListPage';
import Login from './components/Authentication/Login';
import { GlobalStateContext } from './Stores/GlobalStore';

const App = observer((props:any) => {
  const state = useContext(GlobalStateContext);

  useEffect(() => {
    
  }, []);

  return (
    <div>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/Login" component={Login} />
      <Route exact path="/User/Home" component={HomePage} />
      <Route exact path="/Manager/Home" component={HomePage} />
      <Route exact path="/Schedule" component={Calendar} />
      <Route path="/Schedule/Requests" component={RequestListPage} />
    </div>
  );
});

export default App;
