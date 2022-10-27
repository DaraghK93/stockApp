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

function StockDiscoveryPage(){

    // keyword wil either be a word or undefiened, its used in search 
    let {keyword} = useParams()
    return(
            <Container>
                <h1>Stock Discovery Page</h1>
                <StockSearchBar/>
                {keyword === undefined ? (
                    <Row md={1} xs={1}>
                        <StockSummary/>
                    </Row>
                   
                ) : (
                    <Row md={4} xs={1}>
                          <StockSearchResults keyword={keyword}/>
                    </Row>
                )}
            </Container>
    )
    }

export default StockDiscoveryPage;