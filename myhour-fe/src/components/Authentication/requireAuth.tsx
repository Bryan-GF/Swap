import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import { GlobalStateContext } from '../../Stores/GlobalStore';
import Unauthorized from './Unauthorized';

// Authentication route for when user is not logged in. Checks login status. Passed component.
export const NoAuthRoute = ({component: Component, ...rest}) => {
  const state = useContext(GlobalStateContext);
  return (
    <Route
      {...rest}
      render={(props) => {
          return state.loginStatus ?  
          <Redirect to={
              {
              pathname: '/Home',
              state: {
                  from: props.location
              }
              }
          }/> :
          <Component {...props} /> 
      }}
    />
  )
}

// Authentication route for when user is logged in as an employee. Checks login status. Passed component.
export const BasicAuthRoute = ({component: Component, ...rest}) => {
    const state = useContext(GlobalStateContext);
    return (
      <Route
        {...rest}
        render={(props) => {
            return state.loginStatus ? 
            <Component {...props} /> : 
            <Redirect to={
                {
                pathname: '/Login',
                state: {
                    from: props.location
                }
                }
            }/>
        }}
      />
    )
}

// Authentication route for when user is logged in as a manager. Checks role and login status. Passed component.
export const ManagerAuthRoute = ({component: Component, ...rest}) => {
  const state = useContext(GlobalStateContext);
  return (
    <Route
      {...rest}
      render={(props) => {
          return state.loginStatus ? 
          (state.userData.roles === 'Manager' ? 
          <Component {...props} /> : 
          <Unauthorized/>) :
          <Redirect to={
            {
            pathname: '/Login',
            state: {
                from: props.location
            }
            }
        }/>
      }}
    />
  )
}

// Authentication route for when user is logged in as an owner. Checks role and login status. Passed component.
export const OwnerAuthRoute = ({component: Component, ...rest}) => {
  const state = useContext(GlobalStateContext);
  return (
    <Route
      {...rest}
      render={(props) => {
          return state.loginStatus ? 
          (state.userData.roles === 'Owner' ? 
          <Component {...props} /> : 
          <Unauthorized/>) :
          <Redirect to={
            {
            pathname: '/Login',
            state: {
                from: props.location
            }
            }
        }/>
      }}
    />
  )
}
