/// Imports ///
import {
    PORTFOLIO_UPDATE_ACTIVE_REQUEST, PORTFOLIO_UPDATE_ACTIVE_SUCCESS, PORTFOLIO_UPDATE_ACTIVE_FAIL
} from '../constants/portfolioActionConstants';


export function portfolioReducer(state={}, action){
    switch (action.type) {
        ///// Active Portfolios /////
        // Used for the activePortfolios state 
        case PORTFOLIO_UPDATE_ACTIVE_REQUEST:
            return {loading:true}
        case PORTFOLIO_UPDATE_ACTIVE_SUCCESS:
            return {loading: false, activePortfolios: action.payload}
        case PORTFOLIO_UPDATE_ACTIVE_FAIL:
            return {loading: false,  error: action.payload}
        default:
            return state;
    }
}