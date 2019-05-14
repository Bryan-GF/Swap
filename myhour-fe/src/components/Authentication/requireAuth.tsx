import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import { GlobalStateContext } from '../../Stores/GlobalStore';

export const BasicAuthRoute = ({component: Component, ...rest}) => {
    const state = useContext(GlobalStateContext);
    return (
      <Route
        {...rest}
        render={(props) => {
            return state.userData.Position !== "Branch Manager" ? 
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
            console.log(state.userData.Position);
            return state.userData.Position === "Branch Manager"  ? 
            <Component {...props} /> : //Might need to make null display an unauthroized component
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