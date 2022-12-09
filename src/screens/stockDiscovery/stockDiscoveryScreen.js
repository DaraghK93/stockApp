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
    return(<>
    <div className="stockDiscovery">
            <Container>
                {/* <h1 style={{textAlign:"center"}}>Stock Discovery</h1> */}

                <StockSearchBar/>
                <div style={{paddingBottom: "1rem"}}></div>
                </Container>
                {keyword === undefined ? (
                    <Row md={1} xs={1}
                    >
                        <StockSummary/>
                    </Row>
                   
                ) : (
                    <Row md={1} xs={1}>
                        <Container>
                          <StockSearchResults keyword={keyword}/>
                          </Container>
                    </Row>
                )}
                </div>
</>
    )
    }

export default StockDiscoveryPage;