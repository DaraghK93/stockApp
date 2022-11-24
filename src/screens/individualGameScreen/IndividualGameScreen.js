import { useState } from "react";
import GameNavBar from "../../components/gameComponents/individualGameScreenComponents/gameNavigation/GameNavBar";
import PortfolioPage from "../portfolio/portfolio";
import { Container } from 'react-bootstrap'
function IndividualGameScreen() {

    const [screen, setScreen] = useState("")

    const disPlayScreen = (e) => {
        if (e.target.id === "1") {
            setScreen(<br></br>)
        }
        else if (e.target.id === "2") {
            setScreen(<br></br>)
        }
        else if (e.target.id === "3") {
            setScreen(<PortfolioPage />)
        }
        else if (e.target.id === "4") {
            setScreen(<br></br>)
        }
    }

    return (
        <>
            <Container>
                <h1>Game image</h1>
            </Container>
            <GameNavBar disPlayScreen={disPlayScreen} />
            <Container>
                <h1>Timeline</h1>
                {screen}
            </Container>
        </>
    )
}

export default IndividualGameScreen;