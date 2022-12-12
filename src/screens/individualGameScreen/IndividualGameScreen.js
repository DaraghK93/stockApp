import { useState, useEffect } from "react";
import GameNavBar from "../../components/gameComponents/individualGameScreenComponents/gameNavigation/GameNavBar";
import { Container, Image, Row, Col, Button } from 'react-bootstrap';
import GamePortfolio from "../../components/gameComponents/individualGameScreenComponents/gameNavigation/GamePortfolio";
import HoldingsCard from "../../components/portfolioComponents/HoldingsCard/HoldingsCard";
import LeaderBoard from "../../components/gameComponents/individualGameScreenComponents/gameNavigation/LeaderBoard";
import LoadingSpinner from "../../components/widgets/LoadingSpinner/LoadingSpinner";
import MessageAlert from "../../components/widgets/MessageAlert/MessageAlert";
import GameCreationSummary from "../../components/gameComponents/createGameScreenComponents/GameCreationSummary";
import AreYouSure from "../../components/gameComponents/individualGameScreenComponents/gameNavigation/AreYouSure"
import {Logout, Cancel} from '@mui/icons-material';
/// API ///
import { APIName } from '../../constants/APIConstants'
import { API } from "aws-amplify";

/// Redux ///
import { useSelector } from 'react-redux';
import TimeLine from "../../components/gameComponents/individualGameScreenComponents/Timeline";
import ValueLine from "../../components/gameComponents/individualGameScreenComponents/ValueLine";
import CopyComponent from "../../components/widgets/CopyComponent/CopyComponent";
import TransactionHistory from "../../components/portfolioComponents/TransactionHistory/TransactionHistory";

function IndividualGameScreen() {

    /// League State ///
    const [active, setActive] = useState("4")
    const [loading, setLoading] = useState(true);
    const [league, setLeague] = useState('');
    const [error, setError] = useState("");
    const [isShownLeaderBoard, setisShownLeaderBoard] = useState(true);
    const [isShownGameDetails, setisShownGameDetails] = useState(false);
    const [isShownStocks, setisShownStocks] = useState(false);
    const [isShownPortfolio, setisShownPortfolio] = useState(false);
    const [success, setSuccess] = useState("")
    const [showAreYouSureModal, setShowAreYouSureModal ] = useState(false);

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

    function isAdmin() {
        if (league.leagueAdmin === userInfo.username){
            return true
        }
        else {

            return false
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
    }, [userToken, success])


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

    function showGameStocksPage(){
        setisShownGameDetails(false)
        setisShownLeaderBoard(false)
        setisShownPortfolio(false)
        setisShownStocks(true)
        setActive("2")
    }


    function timeOrValueLine() {

        if (league.finished === true) {
            return (
                <>
                    <p>The game is over!</p>
                </>
            )
        }
        else {
            if (league.leagueType === "timeBased") {
                return (
                    <TimeLine 
                    startDate={league.startDate} 
                    endDate={league.endDate} 
                    portfolios={league.portfolios} 
                    accessCode={league.accessCode}
                    setisShownGameDetails={setisShownGameDetails}
                    setisShownLeaderBoard={setisShownLeaderBoard}
                    setisShownPortfolio={setisShownPortfolio}
                    setisShownStocks={setisShownStocks}
                    setActive={setActive}
                    ></TimeLine>

                )
            }
            else {
                return (
                    <ValueLine 
                    portfolios={league.portfolios} 
                    winningValue={league.winningValue} 
                    accessCode={league.accessCode}
                    setisShownGameDetails={setisShownGameDetails}
                    setisShownLeaderBoard={setisShownLeaderBoard}
                    setisShownPortfolio={setisShownPortfolio}
                    setisShownStocks={setisShownStocks}
                    setActive={setActive}
                    ></ValueLine>
                )
            }
        }
    }


    const cancelOrder = async ( transactionId, portfolioId ) => {
        try{
                /// Set the portfolio Loading to true and reset error
                setLoading(true)
                setError()
                const path = '/api/portfolio/cancelLimitOrder'
                let myInit = {
                    headers : {"x-auth-token": userToken},       
                    body: {
                        transactionId: transactionId, 
                        portfolioId: portfolioId, 
                    }
                }
                /// Send the request 
                await API.post(APIName, path, myInit)
                /// Set the success message using the
                setSuccess("Success")
                setLoading(false)
        }catch(error){
            setError(error.response.data.errormessage)
            setLoading(false)
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
                            <p className="ImgTxt">Access Code: <strong>{league.accessCode} </strong>
                                <CopyComponent copyText={accessString} /></p>

                        </div>
                    </div>
                    <GameNavBar disPlayScreen={disPlayScreen} active={active} />
                    {isShownLeaderBoard &&
                        <>
                            <Container>
                                {timeOrValueLine()}
                            </Container>
                            <LeaderBoard leaderBoardInfo={league.portfolios} />
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
                            <Container>
                                {isAdmin() && league.finished !== true &&
                            <Button 
                            variant="danger"
                            onClick={() =>{setShowAreYouSureModal(true)}} 
                            style={{margin: '1rem'}}
                            >Cancel League <Cancel/></Button>
                            }
                            {
                                !isAdmin() && league.finished !== true &&
                                <Button 
                                variant="danger"
                            onClick={() =>{setShowAreYouSureModal(true)}} 
                            style={{margin: '1rem'}}
                            >Leave League <Logout/></Button>
                            }
                        </Container>
                        <AreYouSure showState={showAreYouSureModal} setShowState={setShowAreYouSureModal} 
                            leagueId={league._id}
                            portfolioId={portfolio._id}
                            isAdmin={isAdmin()}
                />
                            </Container>

                    }
                    {isShownStocks &&
                        <Container>
                            <br></br><h2>This is stocks screen</h2>
                        </Container>
                    }
                    {isShownPortfolio && portfolio.holdings.length === 0 && portfolio.transactions.length === 0 ?

                        <>
                            <Container style={{ textAlign: "center" }}>
                                <br></br>
                                <h2>No holdings to display - yet!</h2>
                                <p>You have to spend money to make money, start trading here: </p>
                                <Button onClick={() => showGameStocksPage()}>Trade now</Button>
                            </Container>
                        </>
                        :
                         isShownPortfolio &&
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
                                        <TransactionHistory transactions={portfolio.transactions} cancelOrder={cancelOrder} />
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