import {
    PORTFOLIO_UPDATE_ACTIVE_REQUEST, PORTFOLIO_UPDATE_ACTIVE_SUCCESS, PORTFOLIO_UPDATE_ACTIVE_FAIL
} from '../constants/portfolioActionConstants'
import { APIName } from '../constants/APIConstants'
import { API } from 'aws-amplify'

/// updateActivePortfolios ///
// Description:
//      This action updates the state for portfolios.activePortfolios 
//      This state holds the portfolios a user can trade with 
// Inputs:
//      token - Need to the users JWT token 
export function updateActivePortfolios(userToken) {
    // Return an async function so that it can be awaited in component that calls it
    return async (dispatch) => {
      try {
        // Dispatch request will set loading true 
        dispatch({ type: PORTFOLIO_UPDATE_ACTIVE_REQUEST })
        // Configure the HTTP request
        let path = '/api/portfolio/myGamesAndPortfolios'
        let myInit = {
            headers : {"x-auth-token": userToken},          
        }
        // Sent the request to backend
        const data = await API.get(APIName, path, myInit)
        // Dispatch the user success action
        dispatch({ type: PORTFOLIO_UPDATE_ACTIVE_SUCCESS, payload: data })
      } catch (error) {
        dispatch({
          type: PORTFOLIO_UPDATE_ACTIVE_FAIL,
          payload: error.response.data.errormessage, 
        })
      }
    }
  }