import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import { GlobalStateContext } from '../../Stores/GlobalStore';
import Unauthorized from './Unauthorized';

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

export const BasicAuthRoute = ({component: Component, ...rest}) => {
    const state = useContext(GlobalStateContext);
    console.log(state);
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

export const ManagerAuthRoute = ({component: Component, ...rest}) => {
  const state = useContext(GlobalStateContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        console.log(state.userData.roles);
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
