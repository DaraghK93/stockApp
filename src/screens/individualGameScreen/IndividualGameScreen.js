import { useState, useEffect } from "react";
import GameNavBar from "../../components/gameComponents/individualGameScreenComponents/gameNavigation/GameNavBar";
import { Container, Image, Row, Col } from 'react-bootstrap';
// import GamePortfolio from "../../components/gameComponents/individualGameScreenComponents/gameNavigation/GamePortfolio";
// import HoldingsCard from "../../components/portfolioComponents/HoldingsCard/HoldingsCard";
import LeaderBoard from "../../components/gameComponents/individualGameScreenComponents/gameNavigation/LeaderBoard";
import LoadingSpinner from "../../components/widgets/LoadingSpinner/LoadingSpinner";
import MessageAlert from "../../components/widgets/MessageAlert/MessageAlert";
/// API ///
import { APIName } from '../../constants/APIConstants'
import { API } from "aws-amplify";

/// Redux ///
import { useSelector } from 'react-redux';

function IndividualGameScreen() {

    /// League State ///
    const [active, setActive] = useState("")
    const [loading, setLoading] = useState(true);
    const [league, setLeague] = useState('');
    const [error, setError] = useState("");
    const [isShownLeaderBoard, setisShownLeaderBoard] = useState(true);
    const [isShownGameDetails, setisShownGameDetails] = useState(false);
    const [isShownStocks, setisShownStocks] = useState(false);
    const [isShownPortfolio, setisShownPortfolio] = useState(false);


    /// Redux State ///
    const user = useSelector((state) => state.user)
    const { userInfo } = user;
    const userToken = userInfo.token

    useEffect(() => {
        /// getStockInfo ///
        // Description:
        //  Makes a GET request to the backend route /game/:gameId
        const getLeagueInfo = async () => {
            try {
                // Request is being sent set loading true   
                setLoading(true);
                // get the league Id from the href, got last index of last slash and used substring method
                const leagueId = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
                let path = `/api/league/${leagueId}`;
                let myInit = {
                    headers: { "x-auth-token": userToken },
                }
                API.get(APIName, path, myInit)
                    .then((response) => {
                        setLeague(response)
                        setLoading(false)
                    })
                    .catch((error) => {
                        console.log(error.response);
                    });
            } catch (error) {
                // Log the error 
                console.log(error)
                // Set the error message to be displayed on the page 
                setError(error.response.data.errormessage)
                setLoading(false)
            }
        }
        getLeagueInfo()
    }, [userToken])


    const disPlayScreen = (e) => {
        setActive(e.target.id)
        if (e.target.id === "1") {
            setisShownGameDetails(true)
            setisShownLeaderBoard(false)
            setisShownPortfolio(false)
            setisShownStocks(false)
        }
        else if (e.target.id === "2") {
            setisShownGameDetails(false)
            setisShownLeaderBoard(false)
            setisShownPortfolio(false)
            setisShownStocks(true)
        }
        else if (e.target.id === "3") {
            setisShownGameDetails(false)
            setisShownLeaderBoard(false)
            setisShownPortfolio(true)
            setisShownStocks(false)
        }
        else if (e.target.id === "4") {
            e.preventDefault();
            e.stopPropagation();
            setisShownGameDetails(false)
            setisShownLeaderBoard(true)
            setisShownPortfolio(false)
            setisShownStocks(false)

        }
    }



    return (
        <>

            {loading ? <LoadingSpinner /> : error ? <MessageAlert variant='danger'>{error}</MessageAlert> :
                <>
                    <div className="container-img">
                        <Image className="gameImage" src={"/stock_photo_1.jpg"}></Image>
                        <div className="centeredGameImg">
                            <h1 className="ImgTxt">Warren's Get Rich Quick Scheme</h1>
                        </div>
                    </div>
                    <GameNavBar disPlayScreen={disPlayScreen} active={active} />

                    <Container>
                        <h3>Timeline goes here</h3>
                    </Container>
                    {isShownLeaderBoard &&
                        <>
                            <LeaderBoard leaderBoardInfo={league.portfolios} />
                        </>
                    }
                    {isShownGameDetails &&
                        <><br></br><h2>This is rules screen</h2></>
                    }
                    {isShownStocks &&
                        <><br></br><h2>This is stocks screen</h2></>
                    }
                    {isShownPortfolio &&
                        <>
                            <Container>
                                <Row>
                                    {/* <GamePortfolio data={data.valueHistory} name={data.name} /> */}
                                </Row>
                                <Row>
                                    <Col>
                                        {/* <HoldingsCard data={data.holdings} remainder={data.remainder} /> */}
                                    </Col>
                                </Row>
                                <Row>
                                    <h2>Transaction History here</h2>
                                </Row>
                            </Container>
                        </>

                    }

                </>
            }
        </>
    )
}

export default IndividualGameScreen;