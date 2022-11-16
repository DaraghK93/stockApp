import {Card,Row,Col} from "react-bootstrap"
import RangeSlider from "../../widgets/RangeSlider/RangeSlider"
import InfoButtonModal from "../../widgets/InfoButtonModal/InfoButtonModal"

function GameWinningValueSelection(){
    return(
        <>
            <Card.Title className="gameOptionsCardTitle">Game Winning Value</Card.Title>
            <Row>
                <Col>
                    <Card.Text className="gameOptionsCardSubTitle">Winning Value
                    <InfoButtonModal title="Winning Value" info={<>
                            <p>The Max Daily Trades sets a limit on the number of trades you can make within a day.</p>
                            <p>A smaller number set here will force you use to trade more wisely.</p>
                            <p>A larger number set here will give you more freedom to trade.</p>
                            <p><span className="bolded">Relaxed (50 - 100)</span>- A lot of freedom to make lots of trades.</p>
                            <p><span className="bolded">Medium (15 - 50)</span>- Will force you to think more about how you use your daily trades.</p>
                            <p><span className="bolded">Harsh (1 - 15)</span>- You will really need to think about how you can get the most out of your daily trades.</p>
                            </>}/>
                    </Card.Text>  
                </Col>
            </Row>
          
        </>
    )
}

export default GameWinningValueSelection