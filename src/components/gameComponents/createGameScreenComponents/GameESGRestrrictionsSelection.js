import { Card, Row, Col, ToggleButton} from "react-bootstrap"
import {useState} from 'react'

import EnvironmentalRating from "../../stockVisualisationComponents/ESGRatingSliders/EnvironmentalRating";
import SocialRating from "../../stockVisualisationComponents/ESGRatingSliders/SocialRating";
import GovernanceRating from "../../stockVisualisationComponents/ESGRatingSliders/GovernanceRating";
import EvilRating from "../../stockVisualisationComponents/ESGRatingSliders/EvilRating";
import InfoButtonModal from "../../widgets/InfoButtonModal/InfoButtonModal";

function GameESGRestrictionsSelection(){
    const [ESGGameType,setESGGameType] = useState()


    const gameTypes = ["No Restrictions", "Environment", "Social","Governance"]
    const ESGRating = {
       "No Restrictions" : {
            "description":"For people with No Conscious",
            "stocks":490,
            "eRating":0,
            "sRating":0,
            "gRating":5
        },
        
      "Environment" : {
            "description": "For the Tree Huggers",
            "stocks":408,
            "eRating":4,
            "sRating":0,
            "gRating":0
        },
        "Social":{
            "description":"For Human Rights Activists",
            "stocks":412,
            "eRating":0,
            "sRating":2.5,
            "gRating":0
        },
       "Governance":{
            "description": "For the Ethical Investors",
            "stocks":338,
            "eRating":0,
            "sRating":0,
            "gRating":3.5
        }
    }

    const handleToggle = (e) => { 
        setESGGameType(e.currentTarget.value)
    }

    return(
        <>
            <Card.Title className="gameOptionsCardTitle">ESG Restrictions
                <InfoButtonModal title="What Is an ESG Rating?" 
                info={
                <div>
                    <h4>What does an ESG rating mean?</h4>
                        <p>
                            A good ESG rating means a company is managing its environment, social, and governance risks well relative to its peers.
                        </p>
                        <p>
                            A poor ESG rating is the opposite -- the company has relatively higher unmanaged exposure to ESG risks.
                        </p>
                        <p>
                            You can read more about ESG ratings in this article! Just click  <a href="https://www.fool.com/investing/stock-market/types-of-stocks/esg-investing/esg-rating/" target="_blank" rel="noopener noreferrer">here</a> to be redirected.
                        </p>
                              
                </div>}/>
            
            </Card.Title>
            <Row>
                <Col>
                    <Card.Text className="gameOptionsCardText">The restrictions below will set a minimum ESG rating a company must meet</Card.Text>    
                    <Card.Text className="gameOptionsCardSubTitle">Please Select One Game Mode</Card.Text>
                </Col>
            </Row>
             <Row className="py-3" md={2} sm={1} xs={1}>
                {gameTypes.map((value, idx) => (
                <Col
                    key={`col-${value}`}
                >
                    <ToggleButton
                        className="gameDetailsToggleButton"
                        key={idx}
                        style={{"border":"none"}}
                        id={`radio-${idx}`}
                        variant={'outline-primary'}
                        type="radio"
                        name="radio"
                        value={value}
                        checked={ESGGameType === value}
                        onChange={handleToggle}
                >
                    <Card>
                        <Card.Title className="gameOptionsCardSubTitle">{value}</Card.Title>
                        <Card.Body>
                            <Card.Text className="black">
                                {ESGRating[value].description}
                            </Card.Text>
                            <Card.Text className="black">
                                {ESGRating[value].stocks} stocks to choose from
                            </Card.Text>
                            { value === "Environment" ?
                                <EnvironmentalRating erating={ESGRating[value].eRating} />
                            :  value === "Social" ?
                                <SocialRating srating={ESGRating[value].sRating} />
                            : value === "Governance" ?
                                <GovernanceRating grating={ESGRating[value].gRating} />
                            :
                                <EvilRating erating={ESGRating[value].gRating} />
                            }
                        </Card.Body>
                    </Card>
                    </ToggleButton> 
                </Col>
            ))}
            </Row>
        </>
    )
}

export default GameESGRestrictionsSelection;