import { useState, useEffect } from "react";
import GameNavBar from "../../components/gameComponents/individualGameScreenComponents/gameNavigation/GameNavBar";
import { Container, Image, Row, Col, Button } from 'react-bootstrap';
import GamePortfolio from "../../components/gameComponents/individualGameScreenComponents/gameNavigation/GamePortfolio";
import HoldingsCard from "../../components/portfolioComponents/HoldingsCard/HoldingsCard";
import LeaderBoard from "../../components/gameComponents/individualGameScreenComponents/gameNavigation/LeaderBoard";
import LoadingSpinner from "../../components/widgets/LoadingSpinner/LoadingSpinner";
import MessageAlert from "../../components/widgets/MessageAlert/MessageAlert";
import GameCreationSummary from "../../components/gameComponents/createGameScreenComponents/GameCreationSummary";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Link } from "react-router-dom";
/// API ///
import { APIName } from '../../constants/APIConstants'
import { API } from "aws-amplify";

/// Redux ///
import { useSelector } from 'react-redux';
import TimeLine from "../../components/gameComponents/individualGameScreenComponents/Timeline";
import ValueLine from "../../components/gameComponents/individualGameScreenComponents/ValueLine";
import CopyComponent from "../../components/widgets/CopyComponent/CopyComponent";
import TransactionHistory from "../../components/portfolioComponents/TransactionHistory/TransactionHistory"


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

    // portfolio state
    const [portfolio, setPortfolio] = useState();
    const [portfolioLoading, setPortfolioLoading] = useState();
    const [portfolioError, setPortfolioError] = useState();

    /// Redux State ///
    const user = useSelector((state) => state.user)
    const { userInfo } = user;
    const userToken = userInfo.token
    var accessString = league.accessCode
    function ESGGameType() {
        if (league.minERating === 0 && league.minSRating === 0 && league.minGRating === 0) {
            return "No Restrictions"
        }
        else if (league.minERating > 0) {
            return "Environment"
        }
        else if (league.minSRating > 0) {
            return "Social"
        }
        else if (league.minGRating > 0) {
            return "Governance"
        }
    }

    useEffect(() => {
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
                /// This will be an error from API call 
                console.log(error);
                setError(error.response.data.errormessage)
                setLoading(false)
            });
    }, [userToken])

    useEffect(() => {
        // Request is being sent set loading true   
        setPortfolioLoading(true);
        // get the league Id from the href, got last index of last slash and used substring method
        const leagueId = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
        let path = `/api/portfolio/${leagueId}`;
        let myInit = {
            headers: { "x-auth-token": userToken },
        }
        API.get(APIName, path, myInit)
            .then((response) => {
                setPortfolio(response)
                setPortfolioLoading(false)
            })

            .catch((error) => {
                /// This will be an error from API call 
                console.log(error);
                setPortfolioError(error.response.data.errormessage)
                setPortfolioLoading(false)
            });
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


    function timeOrValueLine() {

        if (!league.finished) {
         
            if (league.leagueType === "timeBased") {
                return (
                    <TimeLine startDate={league.startDate} endDate={league.endDate} portfolios={league.portfolios} accessCode={league.accessCode}></TimeLine>

                )
            }
            else {
                return (
                    <ValueLine portfolios={league.portfolios} winningValue={league.winningValue} accessCode={league.accessCode}></ValueLine>
                )
            }
        } else { 
            return (
                
                <p style={{"textAlign":"center","padding-top":"1rem"}}> <EmojiEventsIcon fontSize="large"></EmojiEventsIcon><strong>{league.finalStandings[0].user} </strong> 
                is the winner! Don't let them win another! Create a game <Link to="/game">here!</Link> </p>
            )
        }

    }

    function leaderboardFields() {
        let info;
        if (league.finished) {
            info = league.finalStandings
        } else {
            info = league.portfolios
        }
        if (portfolio.valueHistory.length === 0 ) {
            return <LeaderBoard leaderBoardInfo={info} change={league.startingBalance}/>
        } else {
            return <LeaderBoard leaderBoardInfo={info} change={portfolio.valueHistory[-1].value}/>
        }
    }

    return (
        <>
            {loading || portfolioLoading ? <LoadingSpinner /> 
            : error ? <MessageAlert variant='danger'>{error}</MessageAlert> 
            : portfolioError ? <MessageAlert variant='danger'>{portfolioError}</MessageAlert>
            :
                <>
                    <div className="container-img">
                        <Image className="gameImage" src={league.image}></Image>
                        <div className="centeredGameImg"><br></br><br></br>
                            <h1 className="ImgTxt">{league.leagueName}</h1><br></br>
                            {!league.finished ? <p className="ImgTxt">Access Code: <strong>{league.accessCode} </strong>
                                                     <CopyComponent copyText={accessString} /></p>
                            : <h2 className="ImgTxt">Game Over!</h2> }

                        </div>
                    </div>
                    <GameNavBar disPlayScreen={disPlayScreen} active={active} />
                    {isShownLeaderBoard &&
                        <>
                        
                            <Container>
                                {timeOrValueLine()}
                            </Container>
                                {leaderboardFields()}
                        </>
                    }
                    {isShownGameDetails &&
                        <Container style={{ "textAlign": "center", "alignItems": "center" }}>
                            <GameCreationSummary
                                gameType={league.leagueType}
                                gameName={league.leagueName}
                                gameStartDate={league.startDate}
                                gameEndDate={league.endDate}
                                startingBalance={league.startingBalance}
                                tradingFee={league.tradingFee}
                                maxTradesPerDay={league.maxDailyTrades}
                                gameWinningValue={league.winningValue}
                                stockTypes={league.sectors}
                                ESGGameType={ESGGameType()}
                            />
                        </Container>
                    }
                    {isShownStocks &&
                        <Container>
                            <br></br><h2>This is stocks screen</h2>
                        </Container>
                    }
                    {isShownPortfolio && portfolio.holdings.length === 0 ?

                        <>
                            <Container style={{ textAlign: "center" }}>
                                <br></br>
                                <h2>No holdings to display - yet!</h2>
                                <p>You have to spend money to make money, start trading here: </p>
                                <Link to="/stockdiscovery"><Button>Trade now</Button></Link>
                            </Container>
                        </>
                        : isShownPortfolio &&
                        <>
                            <Container>
                                <Row>
                                    <GamePortfolio data={portfolio.valueHistory} name={portfolio.portfolioName} totalValue={portfolio.totalValue} />
                                </Row>
                                <Row>
                                    <Col>
                                        <HoldingsCard data={portfolio.holdings} remainder={portfolio.remainder} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col><br></br>
                                        <TransactionHistory transactions={portfolio.transactions}/>
                                    </Col>
                                </Row>
                            </Container>
                            <br></br>
                        </>
                    }
                </>
            }
        </>
    )
}

export default IndividualGameScreen;