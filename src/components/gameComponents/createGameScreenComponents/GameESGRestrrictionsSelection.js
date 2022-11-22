import { Card, Row, Col, ToggleButton} from "react-bootstrap"
import {useState} from 'react'

import EnvironmentalRating from "../../stockVisualisationComponents/ESGRatingSliders/EnvironmentalRating";
import SocialRating from "../../stockVisualisationComponents/ESGRatingSliders/SocialRating";
import GovernanceRating from "../../stockVisualisationComponents/ESGRatingSliders/GovernanceRating";

function GameESGRestrictionsSelection(){
    const [ESGGameType,setESGGameType] = useState()


    const gameTypes = ["No Restrictions", "Environment", "Social","Governance"]
    const ESGRating = {
       "No Restrictions" : {
            "description":"No restrictions on ESG ratings",
            "eRating":0,
            "sRating":0,
            "gRating":0
        },

      "Environment" : {
            "description": "Harsher restictions on Environemnt ratings",
            "eRating":4,
            "sRating":0,
            "gRating":0
        },
        "Social":{
            "description":"Harsher restictions on Social ratings",
            "eRating":0,
            "sRating":2.5,
            "gRating":0
        },
       "Governance":{
            "description":"Harsher restictions on Governance ratings",
            "eRating":0,
            "sRating":0,
            "gRating":3.5
        }
    }

    const handleToggle = (e) => { 
        setESGGameType(e.currentTarget.value)
        console.log(e.currentTarget.value)
    }

    return(
        <>
            <Card.Title className="gameOptionsCardTitle">ESG Restrictions</Card.Title>
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
                            <EnvironmentalRating erating={ESGRating[value].eRating} />
                            <SocialRating srating={ESGRating[value].sRating} />
                            <GovernanceRating grating={ESGRating[value].gRating} />
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