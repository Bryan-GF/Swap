import * as React from 'react';
import {observer} from 'mobx-react-lite';
import { Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import HomePage from './components/HomePage/Homepage';
import Calendar from './components/CalendarPage/Calendar';
import RequestListPage from './components/Requests/RequestsListPage';
import Login from './components/Authentication/Login';

const App = observer(() => {

  return (
    <div>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/Login" component={Login} />
      <Route exact path="/Homepage" component={HomePage} />
      <Route exact path="/Schedule" component={Calendar} />
      <Route path="/Schedule/Requests" component={RequestListPage} />
    </div>
  );
});

export default App;
