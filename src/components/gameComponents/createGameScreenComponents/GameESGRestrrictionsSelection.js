import { Card, Row, Col, ToggleButton} from "react-bootstrap"
import {useState} from 'react'

import EnvironmentalRating from "../../stockVisualisationComponents/ESGRatingSliders/EnvironmentalRating";
import SocialRating from "../../stockVisualisationComponents/ESGRatingSliders/SocialRating";
import GovernanceRating from "../../stockVisualisationComponents/ESGRatingSliders/GovernanceRating";
import EvilRating from "../../stockVisualisationComponents/ESGRatingSliders/EvilRating";
import InfoButtonModal from "../../widgets/InfoButtonModal/InfoButtonModal";

function GameESGRestrictionsSelection({setMinEnvironmentRating,setMinSocialRating,setMinGovernanceRating}){
    const [ESGGameType,setESGGameType] = useState()


    const gameTypes = ["No Restrictions", "Environment", "Social","Governance"]
    const ESGRating = {
       "No Restrictions" : {
            "description":"For people with No Conscious",
            "stocks":490,
            "rating":5,
            "minEnvironmentRating":0,
            "minSocialRating":0,
            "minGovernanceRating":0
        },
        
      "Environment" : {
            "description": "For the Tree Huggers",
            "stocks":408,
            "rating":4,
            "minEnvironmentRating":700,
            "minSocialRating":0,
            "minGovernanceRating":0
        },
        "Social":{
            "description":"For Human Rights Activists",
            "stocks":412,
            "rating":2.5,
            "minEnvironmentRating":0,
            "minSocialRating":400,
            "minGovernanceRating":0
        },
       "Governance":{
            "description": "For the Ethical Investors",
            "stocks":338,
            "rating":3.5,
            "minEnvironmentRating":0,
            "minSocialRating":0,
            "minGovernanceRating":600
        }
    }

    const handleToggle = (e) => { 
        setESGGameType(e.currentTarget.value)
        setMinEnvironmentRating(ESGRating[e.currentTarget.value].minEnvironmentRating)
        setMinSocialRating(ESGRating[e.currentTarget.value].minSocialRating)
        setMinGovernanceRating(ESGRating[e.currentTarget.value].minGovernanceRating)
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
                                <EnvironmentalRating erating={ESGRating[value].rating} />
                            :  value === "Social" ?
                                <SocialRating srating={ESGRating[value].rating} />
                            : value === "Governance" ?
                                <GovernanceRating grating={ESGRating[value].rating} />
                            :
                                <EvilRating erating={ESGRating[value].rating} />
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