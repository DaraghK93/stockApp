// Description:
//  This file contains all the reducers for updating the logged in user state within redux 
//  This state contains the users details. 
//  Each reducer accepts two inputs
//      state - The current state 
//      action - The action which is being called which informs how the state wil be updated 

/// Imports ///
// userActionConstants - These are the action constants for the reducers 
import {  
    USER_LOGIN_REQUEST,USER_LOGIN_SUCCESS,USER_LOGIN_FAIL,USER_LOGOUT, // For userLoginLogoutReducer 
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_PASSWORD_RESET_REQUEST,
    USER_PASSWORD_RESET_SUCCESS, USER_PASSWORD_RESET_FAIL // For userRegisterReducer
} from "../constants/userActionConstants";

/// userLoginReducer ///
// Description:
//  This reducer is in charge of the user state 
//  This reducer is called when the user attempts to sign in or sign out whch alters the user state  
export function userLoginLogoutReducer (state={}, action) {
    // Check the action type 
    switch (action.type){
        // User has made request to login set loading true 
        case USER_LOGIN_REQUEST:
            return {loading:true}
        // User has succesfully logged into the system, set loading false and the user state to payload 
        case USER_LOGIN_SUCCESS:
            return {loading: false, userInfo: action.payload}
        // User has failed to login, set loading false and set the error state to the payload to be displayed
        case USER_LOGIN_FAIL:
            return {loading: false, error: action.payload}
        // User has requested a logout, just return the empty state
        case USER_LOGOUT:
            return {}
        // For default just return state unmodified 
        default:
            return state;
    }
}

/// userRegisterReducer ///
// Description:
//  Reducer used to change state for a register request 
export function userRegisterReducer(state = {}, action) {
    // check action
    switch (action.type){
        // User has requested registration 
        case USER_REGISTER_REQUEST:
            // Set loading to true 
            return {loading: true}
        // User succfully registered 
        case USER_REGISTER_SUCCESS:
            // have user deatials at this point 
            return {loading: false}
        // User cannot be registered 
        case USER_REGISTER_FAIL:
            // Set the error message 
            return {loading: false, error: action.payload}
        // For default just return uunmodfied state 
        default:
            return state; 
    }    
}

/// userRegisterReducer ///
// Description:
//  Reducer used to change state for a register request 
export function userResetPasswordReducer(state = {}, action) {
    // check action
    switch (action.type){
        // User has requested registration 
        case USER_PASSWORD_RESET_REQUEST:
            // Set loading to true 
            return {loading: true}
        // User succfully registered 
        case USER_PASSWORD_RESET_SUCCESS:
            // have user deatials at this point 
            return {loading: false}
        // User cannot be registered 
        case USER_PASSWORD_RESET_FAIL:
            // Set the error message 
            return {loading: false, error: action.payload}
        // For default just return uunmodfied state 
        default:
            return state; 
    }    
}
