// Description:
//  This file holds all the redux actions associated with the user state

/// Imports ///
// userActionConstatns - Contants for user actions
// APIName             - The name of the API
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_CHANGEDETAILS_REQUEST,
  USER_CHANGEDETAILS_SUCCESS,
  USER_CHANGEDETAILS_FAIL,
  USER_VERIFY_JWT_REQUEST,
  USER_VERIFY_JWT_SUCCESS,
  USER_VERIFY_JWT_FAIL
} from '../constants/userActionConstants'
import { APIName } from '../constants/APIConstants'
import { API } from 'aws-amplify';
import jwt_decode from "jwt-decode";

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

export function verifyJWT(jwtToken) {
  return (dispatch) => {
    /// Set the verify state loading to true 
    dispatch({ type: USER_VERIFY_JWT_REQUEST })
    /// Decode the JWT 
    let decoded = jwt_decode(jwtToken)
    /// Get the difference in units of days to when the token expires 
    var dateNow = new Date();
    let difference = (decoded.exp * 1000) - dateNow.getTime() // * 1000 here to convert seconds -> ms 
    let daysToExpire = Math.ceil(difference / (1000 * 3600 * 24));
    /// If there token expires today or in the past then make them log back in 
    if (daysToExpire <= 1){
      // remove the users info from local storage, will have old JWT in it 
      localStorage.removeItem('userInfo')
      /// Dispatch logout action will remove userInfo from redux 
      dispatch({ type: USER_LOGOUT })
      /// Dispatch the User verify fail, will set valid to false and loading to false 
      dispatch({ type: USER_VERIFY_JWT_FAIL })
    }else{
      /// Token is ok set the valid state to true and loading false
      dispatch({type: USER_VERIFY_JWT_SUCCESS})
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

export function changeUserDetails(
  password,
  username,
  newPassword,
  avatar,
  firstname,
  lastname,
  email,
  userToken
) {

  return async (dispatch) => {
    try {
      // Initiate the request
      dispatch({ type: USER_CHANGEDETAILS_REQUEST })
      // Request body
      let body = {
        password: password,
        username: username ? username : undefined,
        newPassword: newPassword ? newPassword : undefined,
        avatar: avatar ? avatar : undefined,
        firstname: firstname ? firstname : undefined,
        lastname: lastname ? lastname : undefined,
        email: email? email : undefined,
      };
      // Configure the HTTP request
      let path = `/api/auth/changeuserdetails`;
      let requestConfig = {
        body,
        headers: { 'x-auth-token': userToken },
      };
      //// Sent the request to backend
      const data = await API.post(APIName, path, requestConfig)
      //// Dispatch change details success as this will set user state in redux
      dispatch({ type: USER_CHANGEDETAILS_SUCCESS, payload: data })
      //// Dispatch login success as this will set user state in redux
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
      //// Set the user in localstorage
      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      // Error in changing user details set the message
      dispatch({
        type: USER_CHANGEDETAILS_FAIL,
        payload: error.response.data.errormessage,
      })
    }
  }
}