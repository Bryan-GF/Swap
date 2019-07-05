// Global State
import { GlobalStateContext } from './Stores/GlobalStore';

// Functional package imports
import React, {useEffect, useState, useContext} from 'react';
import {observer} from 'mobx-react-lite';
import { Route } from 'react-router-dom';
import axios from 'axios';

// Design

// Components
import LandingPage from './components/LandingPage/LandingPage';
import HomePage from './components/HomePage/Homepage';
import Calendar from './components/CalendarPage/Calendar';
import RequestListPage from './components/Requests/RequestsListPage';
import Login from './components/Authentication/Login';
import {BasicAuthRoute, ManagerAuthRoute, NoAuthRoute } from './components/Authentication/requireAuth';
import { VerifyToken } from './components/Authentication/VerifyToken';
import EmployeeProfile from './components/EmployeeProfile/EmployeeProfile';
import Signup from './components/Authentication/Signup';
import Settings from './components/Settings/Settings';
import Conversations from './components/Conversations/Conversations';
import ResetPassword from './components/ResetPassword/ResetPasswordPage';

const App = observer((props:any) => {

  const state = useContext(GlobalStateContext);
  const [loading, setLoading] = useState(true);

  // Adds jsonwebtoken to default axios header.
  axios.interceptors.request.use(
    config => {
      if (!config.headers.Authorization) {
        const token = localStorage.getItem("Token");
  
        if (token) {
          config.headers.Authorization = token;
        }
      }
  
      return config;
    },
    error => Promise.reject(error)
  );

  // On component did mount, attempts to verify token if available.
  useEffect(() => {
    console.log(process.env);
    const token = localStorage.getItem('Token');
    if(token) {
      VerifyToken(state, setLoading, token);
    } else {
      setLoading(false);
    }
  }, [])
  
  return (
    <div>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/Register" component={Signup} />
      {!loading ?
        <div>
          <NoAuthRoute exact path="/Login" component={Login} />
          <NoAuthRoute exact path="/ResetPassword" component={ResetPassword} />
          <BasicAuthRoute exact path="/Home" component={HomePage} /> 
          <BasicAuthRoute exact path="/Settings" component={Settings} />   
          <BasicAuthRoute exact path="/Conversations" component={Conversations} />            
          <BasicAuthRoute exact path="/Requests" component={Calendar} />
          <BasicAuthRoute path="/Requests/List" component={RequestListPage} />
          <ManagerAuthRoute path="/Employee/:UserID" component={EmployeeProfile}/>
        </div>
      : null}
    </div>
  );
});

export default App;
