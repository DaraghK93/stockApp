/// Stock Discovery Screen ///
// Route:
//  <URL>/stockdiscovery
// Description:
//  This screen contains the components rendered to the user when they click "Explore stocks"

import {Container,Row } from 'react-bootstrap';
import StockSearchBar from '../../components/stockDiscoveryComponents/stockSearchBar/StockSearchBar';
import { useParams} from 'react-router-dom';
import StockSummary from "../../components/stockDiscoveryComponents/stockSummary/stockSummary"
import StockSearchResults from "../../components/stockDiscoveryComponents/stockSearchResults/StockSearchResults"
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';

/// Redux ///
import {useSelector} from 'react-redux';

function StockDiscoveryPage(){
    /// Get the user state from redux 
    const user = useSelector((state) => state.user)
    const {userInfo} = user; 

    const navigate = useNavigate(); 

    /// useEffect ///
    // Check if the is logged in, if not redirect them to home 
    useEffect (() => {
        if(userInfo === null){
            navigate(`/`)
        }
        
    },[userInfo,navigate])


    // keyword wil either be a word or undefiened, its used in search 
    let {keyword} = useParams()
    return(
            <Container>
                <h1 style={{textAlign:"center"}}>Stock Discovery</h1>
                <StockSearchBar/>
                {keyword === undefined ? (
                    <Row md={1} xs={1}>
                        <StockSummary/>
                    </Row>
                   
                ) : (
                    <Row md={1} xs={1}>
                          <StockSearchResults keyword={keyword}/>
                    </Row>
                )}
            </Container>
    )
    }

export default StockDiscoveryPage;