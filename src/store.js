/// Description:
//  Holds the store for 

/// Imports ///
// redux - For global state managment 
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'

/// Reducers ///
import {userLoginLogoutReducer} from './reducers/userReducers'


/// Initial State ///
const initialState = {} 


/// Create the store ///
// reducer - An object with the name of reducer and functions 
const store = configureStore({
    reducer:{
        user: userLoginLogoutReducer
    },
    middleware: [...getDefaultMiddleware()],
    devTools: true,
    preloadedState: initialState
})


export default store;