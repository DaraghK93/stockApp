// Description:
//  This file holds the user action values in constants
//  they are stored in constants hear as they are used throughout the app and only need to 
//  be updated in one place if needs be

/// Login/Logout action constants ///
export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST"; 
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAIL    = "USER_LOGIN_FAIL"; 
export const USER_LOGOUT        = "USER_LOGOUT";


// Register constants 
export const USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAIL    = "USER_REGISTER_FAIL";

// Change details constants
export const USER_CHANGEDETAILS_REQUEST = "USER_CHANGEDETAILS_REQUEST";
export const USER_CHANGEDETAILS_SUCCESS = "USER_CHANGEDETAILS_SUCCESS";
export const USER_CHANGEDETAILS_FAIL    = "USER_CHANGEDETAILS_FAIL";

// JWT Verify constants 
export const USER_VERIFY_JWT_REQUEST  = "USER_VERIFY_JWT_REQUEST";
export const USER_VERIFY_JWT_SUCCESS  = "USER_VERIFY_JWT_SUCCESS";
export const USER_VERIFY_JWT_FAIL     = "USER_VERIFY_JWT_FAIL";

// Reset errors for components
export const RESET_ERROR  =  "RESET_ERROR";