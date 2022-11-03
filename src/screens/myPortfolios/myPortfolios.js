import { Container
 //   , Button, Row, Col 
} from "react-bootstrap";
// import { useState } from "react";
// import PortfolioCard from "../../components/portfolioComponents/portfolioCard/PortfolioCard";
import { Link } from "react-router-dom";

function MyPortfolios() {
    // use these to check if the user has a portfolio attached to the account

    // const [isShownPortfolios, setIsShownPortfolios] = useState(true);
    // const [noPortfolios, setNoPortfolios] = useState(false);
    

    return (
        <Container>
            <h1>My Portfolios</h1>
            <br></br>
            {/* {noPortfolios && <div> */}
                <p> Looks like you have no porfolios yet! Would you like to <Link to="/createportfolio"><strong>create a portfolio?</strong></Link></p>
            {/* </div> */}
        
            {/* {isShownPortfolios && */}
                {/* <div>
                    <Row>
                        <Link to="/createportfolio">
                            <Button style={{marginBottom:"10px"}}>Create portfolio</Button>
                        </Link>
                    </Row>
                    <Row>
                        <Col style={{margin:"5px"}}>
                        <PortfolioCard portfolioName={"Portfolio 1"} />
                        </Col>
                    </Row>
                </div> 
         } */}
        </Container>
    )
}

export default MyPortfolios;