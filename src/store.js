/// Description:
//  Holds the store for 

/// Imports ///
// redux - For global state managment 
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'

/// Reducers ///
import {userLoginLogoutReducer} from './reducers/userReducers'


/// Initial State ///#
// userLocalStorage - If a users state is saved in loclastorage dont make them sign in again 
const userLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

/// This will be the preloaded state ///
const initialState = {
    user: {userInfo: userLocalStorage}
} 


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