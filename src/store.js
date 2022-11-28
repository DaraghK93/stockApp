/// Description:
//  Holds the store for 

/// Imports ///
// redux - For global state managment 
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'

/// Reducers ///
import {userLoginLogoutReducer,userRegisterReducer} from './reducers/userReducers';
import {portfolioReducer} from './reducers/portfolioReducers';

/// Initial State ///#
// userLocalStorage - If a users state is saved in loclastorage dont make them sign in again 
const userLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const portfolioInitialState = [{
    "_id": "6383c384e1f95f5e41426c78",
    "portfolioName": "Stock Battle Royale Portfolio",
    "leagueId": "6383c384e1f95f5e41426c76",
    "leagueName": "Stock Battle Royale"
},
{
    "_id": "6383c384e1f95f5e41426c78",
    "portfolioName": "Stock Battle Royale Portfolio",
    "leagueId": "6383c384e1f95f5e41426c76",
    "leagueName": "Stock Battle Royale"
}
]


/// This will be the preloaded state ///
const initialState = {
    user: {
        userInfo: userLocalStorage
    },
    portfolios: {
        activePortfolios: portfolioInitialState
    }
} 


/// Create the store ///
// reducer - An object with the name of reducer and functions 
const store = configureStore({
    reducer:{
        user: userLoginLogoutReducer,
        userRegistration: userRegisterReducer,
        portfolios: portfolioReducer
    },
    middleware: [...getDefaultMiddleware()],
    devTools: true,
    preloadedState: initialState
})


export default store;