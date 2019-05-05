import * as React from 'react';
import {observer} from 'mobx-react-lite';
import { Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Authentication from './components/Authentication/Authentication';
import HomePage from './components/HomePage/Homepage';
import Calendar from './components/CalendarPage/Calendar';
import Nav from './components/Navigation/Nav';

const App = observer(() => {

  return (
    <div>
      <Nav/>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/Authentication" component={Authentication} />
      <Route exact path="/Homepage" component={HomePage} />
      <Route exact path="/Schedule" component={Calendar} />
    </div>
  );
});

export default App;
