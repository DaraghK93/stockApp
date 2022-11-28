import { useState } from "react";
import GameNavBar from "../../components/gameComponents/individualGameScreenComponents/gameNavigation/GameNavBar";
import PortfolioPage from "../portfolio/portfolio";
import { Container, Image } from 'react-bootstrap';
import TimeLine from "../../components/gameComponents/individualGameScreenComponents/Timeline";
import moment from 'moment'
import ValueLine from "../../components/gameComponents/individualGameScreenComponents/ValueLine";

function IndividualGameScreen() {
    const [screen, setScreen] = useState("")
    const [active, setActive] = useState("4")

    var startDate = moment("2022-11-22");
    var endDate = moment("2022-12-05");

    const game={
    leagueType: "timeBased"
}

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
            <div className="container-img">
                <Image className="gameImage" src={"/stock_photo_1.jpg"}></Image>
                <div className="centeredGameImg">
                    <h1 className="ImgTxt">Warren's Get Rich Quick Scheme</h1>
                </div>
            </div>
            <GameNavBar disPlayScreen={disPlayScreen} active={active} />

            <Container style={{paddingTop:"2rem"}}>
            {game.leagueType === "timeBased" ? 
                <TimeLine startDate={startDate} endDate={endDate}/> : 
                <ValueLine />
                } 
                {screen}
            </Container>
        </>
    )
}

export default IndividualGameScreen;