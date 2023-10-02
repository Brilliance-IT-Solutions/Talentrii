import React, { createContext, useReducer } from 'react';
import authInitialState from './initialState/authInitialState';
import authReducer from './reducers/auth';

export const GlobalContext = createContext({});

export default GlobalProvider = ({children}) => {

    const [authState, authDispatch] = useReducer(authReducer, authInitialState)

    return (
        < GlobalContext.Provider value={{ authState, authDispatch }}>
            {children}
        </GlobalContext.Provider >
    )
}