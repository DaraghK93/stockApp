// Description:
//  This file holds all the redux actions associated with the user state

/// Imports ///
// userActionConstatns - Contants for user actions
// APIName             - The name of the API
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT, // For userLoginLogoutReducer
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_PASSWORD_RESET_REQUEST,
  USER_PASSWORD_RESET_SUCCESS,
  USER_PASSWORD_RESET_FAIL
} from '../constants/userActionConstants'
import { APIName } from '../constants/APIConstants'
import { API } from 'aws-amplify'

export function login(email, password) {
  // Return an async function so that it can be awaited in component that calls it
  return async (dispatch) => {
    try {
      // Dispatch user login request whuch sets loading to true so that loading screen can be set
      dispatch({ type: USER_LOGIN_REQUEST })
      // Configure the HTTP request
      let path = '/api/user/login'
      let requestConfig = {
        body: {
          email: email,
          password: password,
        },
      }
      // Sent the request to backend
      const data = await API.post(APIName, path, requestConfig)
      // Dispatch the user success action
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
      // Set the users data to local storage also
      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: error.response.data.errormessage, /// THIS NEEDS TO BE AGRRED UPON WITH BACKEND GUYS SHOULD BE NICE ERROR MESSAGE
      })
    }
  }
}

export function logout() {
  return (dispatch) => {
    // remvoe the users info from local storage
    localStorage.removeItem('userInfo')
    // Dispatch the logout action
    dispatch({ type: USER_LOGOUT })
  }
}

export function registerUser(
  firstName,
  lastName,
  email,
  username,
  password,
  overEighteen,
) {
  return async (dispatch) => {
    try {
      // Initiate the request
      dispatch({ type: USER_REGISTER_REQUEST })
      // Configure the HTTP request
      let path = '/api/user/'
      let requestConfig = {
        body: {
          firstname: firstName,
          lastname: lastName,
          email: email,
          username: username,
          password: password,
          overeighteen: overEighteen,
        },
      }
      //// Sent the request to backend
      const data = await API.post(APIName, path, requestConfig)
      //// Dispatch the user register success, sets register loading false
      dispatch({ type: USER_REGISTER_SUCCESS })
      //// Dispatch login success as this will set user state in redux
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
      //// Set the user in localstorage
      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      // Error in regsitraing user set the message
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: error.response.data.errormessage,
      })
    }
  }
}

export function resetPassword(token, password) {
  console.log('token is ' +token);
  // Return an async function so that it can be awaited in component that calls it
  return async (dispatch) => {
    try {
      // Dispatch user login request whuch sets loading to true so that loading screen can be set
      dispatch({ type: USER_LOGIN_REQUEST })
      // Configure the HTTP request
      let path = `/api/auth/reset/${token}`
      let requestConfig = {
        body: {
          password: password,
        },
      }
      // Sent the request to backend
      const data = await API.post(APIName, path, requestConfig)
      // Dispatch the user success action
      dispatch({ type: USER_PASSWORD_RESET_SUCCESS, payload: data })
      //////////////////////////////////////////////////////////////////////////////////////////////////////
      /////////////////////////////////////////////////////////////////////////////////////////////////////
      // Set the users data to local storage also ////MIGHT NEED TO CHANGE THIS HERE !!!!!!!!!!!!!!!!!!!!
      
      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: USER_PASSWORD_RESET_FAIL,
        payload: error.response.data.errormessage, /// THIS NEEDS TO BE AGRRED UPON WITH BACKEND GUYS SHOULD BE NICE ERROR MESSAGE
      })
    }
  }
}

export function requestResetPassword(email) {
  // Return an async function so that it can be awaited in component that calls it
  return async (dispatch) => {
    try {
      // Configure the HTTP request
      let path = `/api/auth/recover`
      let requestConfig = {
        body: {
          email: email,
        },
      }
      // Sent the request to backend
      const data = await API.post(APIName, path, requestConfig)

      //////////////////////////////////////////////////////////////////////////////////////////////////////
      /////////////////////////////////////////////////////////////////////////////////////////////////////
      // Set the users data to local storage also ////MIGHT NEED TO CHANGE THIS HERE !!!!!!!!!!!!!!!!!!!!
      
      // localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {

    }
  }
}
