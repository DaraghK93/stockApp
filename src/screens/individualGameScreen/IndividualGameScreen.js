import { useState } from "react";
import GameNavBar from "../../components/gameComponents/individualGameScreenComponents/gameNavigation/GameNavBar";
import PortfolioPage from "../portfolio/portfolio";
import { Container, Row, Col, Card, Image, Overlay } from 'react-bootstrap'
function IndividualGameScreen() {


    const [screen, setScreen] = useState("")
    const [active, setActive] = useState("4")

    const disPlayScreen = (e) => {
        setActive(e.target.id)
        if (e.target.id === "1") {
            setScreen(<><br></br><h2>This is rules screen</h2></>)
        }
        else if (e.target.id === "2") {
            setScreen(<><br></br><h2>This is stocks screen</h2></>)
        }
        else if (e.target.id === "3") {
            setScreen(<PortfolioPage />)
        }
        else if (e.target.id === "4") {
            setScreen(<><br></br><h2>This is Leaderboard screen</h2></>)
        }
    }

    return (
        <>
            <Row>

                <div className="container-img">
                    <Image className="gameImage" src={"/stock_photo_1.jpg"}></Image>
                    <div className="centeredGameImg">
                        <h1 className="ImgTxt">Warren's Get Rich Quick Scheme</h1>
                    </div>
                </div>

            </Row>
            <Row>
                <GameNavBar disPlayScreen={disPlayScreen} active={active} />
            </Row>
            <Container>
                <h3>Timeline goes here</h3>
                {screen}
            </Container>
        </>
    )
}

export default IndividualGameScreen;