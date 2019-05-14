import React, {useState, useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import { GlobalStateContext } from '../../Stores/GlobalStore';

export const ProtectedRoute = ({component: Component, ...rest}) => {
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