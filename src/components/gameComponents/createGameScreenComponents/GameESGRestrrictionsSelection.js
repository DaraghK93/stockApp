import { Card, Row, Col, ToggleButton} from "react-bootstrap"
import EnvironmentalRating from "../../stockVisualisationComponents/ESGRatingSliders/EnvironmentalRating";
import {useState} from 'react'

function GameESGRestrictionsSelection(){
    const [ESGGameType,setESGGameType] = useState()


    const gameTypes = ["No Restrictions", "Environment", "Social","Governance"]
    const ESGRating = {
       "No Restrictions" : {
            "eRating":5,
            "srating":5,
            "gRating":5
        },

      "Environment" : {
            "eRating":2,
            "srating":5,
            "gRating":5
        },
        "Social":{
            "eRating":5,
            "srating":2,
            "gRating":5
        },
       "Governance":{
            "eRating":5,
            "srating":5,
            "gRating":2
        }
    }

    const handleToggle = (e) => { 
        setESGGameType(e.currentTarget.value)
        console.log(e.currentTarget.value)
    }

    return(
        <>
            <Card.Title className="gameOptionsCardTitle">ESG Restrictions</Card.Title>
             <Row className="py-3" md={4} sm={1} xs={1}>
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
                        <Card.Title>{value}</Card.Title>
                    </Card>
                    </ToggleButton> 
                </Col>
            ))}
            </Row>
        </>
    )
}

export default GameESGRestrictionsSelection;