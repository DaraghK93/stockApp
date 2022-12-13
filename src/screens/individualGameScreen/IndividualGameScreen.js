import { useState, useEffect } from "react";
import GameNavBar from "../../components/gameComponents/individualGameScreenComponents/gameNavigation/GameNavBar";
import { Container, Image, Row, Col, Button, Modal, Accordion } from 'react-bootstrap';
import GamePortfolio from "../../components/gameComponents/individualGameScreenComponents/gameNavigation/GamePortfolio";
import HoldingsCard from "../../components/portfolioComponents/HoldingsCard/HoldingsCard";
import LeaderBoard from "../../components/gameComponents/individualGameScreenComponents/gameNavigation/LeaderBoard";
import LoadingSpinner from "../../components/widgets/LoadingSpinner/LoadingSpinner";
import MessageAlert from "../../components/widgets/MessageAlert/MessageAlert";
import GameCreationSummary from "../../components/gameComponents/createGameScreenComponents/GameCreationSummary";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Link } from "react-router-dom";
import moment from "moment";
import AreYouSure from "../../components/gameComponents/individualGameScreenComponents/gameNavigation/AreYouSure"

import { Logout, Cancel } from '@mui/icons-material';
import GameStocks from "../../components/gameComponents/individualGameScreenComponents/GameStocks";

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
    const [showAreYouSureModal, setShowAreYouSureModal] = useState(false);
    // message state
    const [show, setShow] = useState(false)
    const [transaction, setTransaction] = useState("")

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
        if (league.leagueAdmin === userInfo.username) {
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


    function showGameStocksPage() {
        setisShownGameDetails(false)
        setisShownLeaderBoard(false)
        setisShownPortfolio(false)
        setisShownStocks(true)
        setActive("2")
    }


    function checkForDraw() {
        if (league.finalStandings.length > 1) {

            if (league.finalStandings[0].totalValue !== league.finalStandings[1].totalValue) {
                return <p style={{ "textAlign": "center", "paddingTop": "1rem" }}> <EmojiEventsIcon fontSize="large"></EmojiEventsIcon><strong>{league.finalStandings[0].user} </strong>
                    is the winner! Don't let them win another! Create a game <Link className="linkStyle" to="/game">here!</Link> </p>
            } else {
                let draws = [league.finalStandings[0].user]
                for (let i = 1; i < league.finalStandings.length; i++) {
                    if (league.finalStandings[i].totalValue === league.finalStandings[0].totalValue) {
                        draws.push(league.finalStandings[i].user)
                    } else {
                        break
                    }

                }
                let drawString = draws.join(', ')
                // replace last comma with and
                drawString = drawString.replace(/,(?=[^,]+$)/, ', and ')
                return <p style={{ "textAlign": "center", "paddingTop": "1rem" }}> <EmojiEventsIcon fontSize="large"></EmojiEventsIcon>Draw between <strong>{drawString}! </strong>
                    Have another go <Link to="/game">here!</Link> </p>
            }
        } else {
            return <p style={{ "textAlign": "center", "paddingTop": "1rem" }}> <EmojiEventsIcon fontSize="large"></EmojiEventsIcon><strong>{league.finalStandings[0].user} </strong>
                is the winner! Don't let them win another! Create a game <Link className="linkStyle" to="/game">here!</Link> </p>
        }
    }



    function timeOrValueLine() {

        if (!league.finished) {

            if (league.leagueType === "timeBased" || (!league.active)) {
                return (
                    <TimeLine
                        startDate={league.startDate}
                        endDate={league.endDate}
                        portfolios={league.portfolios}
                        accessCode={league.accessCode}
                    ></TimeLine>

                )
            }
            else {
                return (
                    <ValueLine
                        portfolios={league.portfolios}
                        winningValue={league.winningValue}
                        accessCode={league.accessCode}
                    ></ValueLine>
                )
            }
        } else {
            return (

                checkForDraw()
            )
        }

    }


    const cancelOrder = async (transactionId, portfolioId) => {
        try {
            /// Set the portfolio Loading to true and reset error
            setLoading(true)
            setError()
            const path = '/api/portfolio/cancelLimitOrder'
            let myInit = {
                headers: { "x-auth-token": userToken },
                body: {
                    transactionId: transactionId,
                    portfolioId: portfolioId,
                }
            }
            /// Send the request 
            await API.post(APIName, path, myInit)
            /// Set the success message using the
            setSuccess(transactionId)
            setShow(false);
            setLoading(false)

        } catch (error) {
            setError(error.response.data.errormessage)
            setLoading(false)
        }
    }

    const handleClose = () => {
        /// On close reset the success and errors, they may be going back to make another trade
        setError("")
        setSuccess("")
        setShow(false);
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
                                        : <h2 className="ImgTxt">Game Over!</h2>}

                                </div>
                            </div>
                            <GameNavBar disPlayScreen={disPlayScreen} active={active} />

                            <Modal centered show={show} onHide={handleClose} backdrop="static">
                                <Modal.Header closeButton>
                                    <Modal.Title>Cancel order</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <h2>Are you sure you want to cancel this order?</h2><br></br>
                                    {transaction &&
                                        <>
                                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <div style={{
                                                    width: "6rem",
                                                    height: "6rem",
                                                }}>
                                                    <img src={transaction.stock[0].logo} style={{
                                                        maxWidth: "100%",
                                                        height: "100%",
                                                        display: "block",
                                                        objectFit: "contain",
                                                        marginLeft: "auto",
                                                        marginRight: "auto"
                                                    }}
                                                        alt="company logo">
                                                    </img>
                                                </div>
                                            </div>
                                            <div style={{ marginLeft: "auto", marginRight: "auto" }}>
                                                <Accordion>
                                                    <Accordion.Item eventKey="0">
                                                        <Accordion.Header align="center" style={{ "justifyContent": "center" }}>Order Details</Accordion.Header>
                                                        <Accordion.Body>
                                                            <strong>{transaction.stock[0].shortname}</strong>
                                                            <ul style={{ listStyleType: "none" }}>
                                                                <li><strong>Date: </strong>{moment(transaction.date).format('DD-MM-YYYY')}</li>
                                                                <li><strong>Ticker: </strong>{transaction.stock[0].symbol}</li>
                                                                <li><strong>Buy/ Sell: </strong>{transaction.buyOrSell}</li>
                                                                <li><strong>Value: </strong>{parseFloat(transaction.value).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</li>
                                                                <li><strong>Order Type: </strong>{transaction.orderType}</li>
                                                                <li><strong>Trading Fee: </strong>{parseFloat(transaction.tradingFee).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</li>
                                                                <li><strong>Stocks: </strong>{transaction.units.toFixed(2)}</li>
                                                            </ul>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>
                                            </div>
                                        </>
                                    }
                                </Modal.Body>
                                <Modal.Footer>
                                    <Modal.Footer>
                                        <Button variant="primary"
                                            onClick={handleClose}
                                        >
                                            No,<br></br> I changed my mind!
                                        </Button>
                                        <Button variant="danger"
                                            // onClick={getStockInfo}
                                            onClick={() => cancelOrder(transaction._id, transaction.portfolioId)}
                                        >
                                            Yes,<br></br> lets cancel this order!
                                        </Button>
                                    </Modal.Footer>
                                </Modal.Footer>
                            </Modal>
                            {isShownLeaderBoard &&
                                <>

                                    <Container>
                                        {timeOrValueLine()}
                                    </Container>
                                    {league.finished ? <LeaderBoard leaderBoardInfo={league.finalStandings} startingBalance={league.startingBalance} />
                                        : <LeaderBoard leaderBoardInfo={league.portfolios} startingBalance={league.startingBalance} />}
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
                                                onClick={() => { setShowAreYouSureModal(true) }}
                                                style={{ margin: '1rem' }}
                                            >Cancel League <Cancel /></Button>
                                        }
                                        {
                                            !isAdmin() && league.finished !== true &&
                                            <Button
                                                variant="danger"
                                                onClick={() => { setShowAreYouSureModal(true) }}
                                                style={{ margin: '1rem' }}
                                            >Leave League <Logout /></Button>
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
                                <>
                                    <GameStocks league={league}></GameStocks>
                                </>
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
                                                <TransactionHistory
                                                    transactions={portfolio.transactions}
                                                    setShow={setShow}
                                                    setTransaction={setTransaction}

                                                />
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