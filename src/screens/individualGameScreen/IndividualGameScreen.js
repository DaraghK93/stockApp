import { useState, useEffect } from "react";
import GameNavBar from "../../components/gameComponents/individualGameScreenComponents/gameNavigation/GameNavBar";
import { Container, Image, Row, Col } from 'react-bootstrap';
import GamePortfolio from "../../components/gameComponents/individualGameScreenComponents/gameNavigation/GamePortfolio";
import HoldingsCard from "../../components/portfolioComponents/HoldingsCard/HoldingsCard";
import LeaderBoard from "../../components/gameComponents/individualGameScreenComponents/gameNavigation/LeaderBoard";
import LoadingSpinner from "../../components/widgets/LoadingSpinner/LoadingSpinner";
import MessageAlert from "../../components/widgets/MessageAlert/MessageAlert";
/// API ///
import { APIName } from '../../constants/APIConstants'
import { API } from "aws-amplify";

/// Redux ///
import { useSelector } from 'react-redux';
import TimeLine from "../../components/gameComponents/individualGameScreenComponents/Timeline";
import ValueLine from "../../components/gameComponents/individualGameScreenComponents/ValueLine";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
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


    const data = {
        name: "PortfolioC", valueHistory: [
            { date: '01-10', value: 100 },
            { date: '01-11', value: 200 },
            { date: '01-12', value: 60 },
            { date: '01-13', value: 300 },
            { date: '01-14', value: 500 },
            { date: '01-15', value: 10 },
            { date: '01-16', value: 700 },
            { date: '01-17', value: 60 },
            { date: '01-18', value: 700 },
            { date: '01-19', value: 800 },
            { date: '01-20', value: 100 },
            { date: '01-21', value: 200 },
            { date: '01-22', value: 630 },
            { date: '01-23', value: 900 },
            { date: '01-24', value: 100 },
        ],
        remainder: 100,
        holdings: [
            { longname: "Microsoft Inc.", symbol: 'MSFT', logo: "https://blogs.microsoft.com/wp-content/uploads/prod/2012/08/8867.Microsoft_5F00_Logo_2D00_for_2D00_screen.jpg", value: 500, currentprice: 100, sector: "Healthcare", quantity: 5 },
            { longname: "Amazon", symbol: 'AMZN', logo: "https://1000logos.net/wp-content/uploads/2016/10/Amazon-logo-meaning.jpg", value: 80, currentprice: 40, sector: "Healthcare", quantity: 2 },
            { longname: "Apple Inc", symbol: 'AAPL', logo: "https://cdn.mos.cms.futurecdn.net/6bTF6C2QiWXvhi33fJi3AC.jpg", value: 30, currentprice: 10, sector: "Science", quantity: 3 },
            { longname: "Johnson and Johnson", symbol: 'JNJ', logo: "https://1000logos.net/wp-content/uploads/2020/04/Logo-Johnson-Johnson.jpg", value: 20, currentprice: 20, sector: "Pharmacy", quantity: 1 },
            { longname: "Viatris Inc.", symbol: 'VTRS', logo: "https://irishbusinessfocus.ie/wp-content/uploads/2020/11/Viatris-1.jpg", value: 100, currentprice: 20, sector: "Genocide", quantity: 5 },
            { longname: "Trimble Inc.", symbol: 'TRMB', logo: "https://cdn.cookielaw.org/logos/c885c24a-94ee-4211-9f8a-34755125ad52/34e16f3f-7e18-4206-9622-88302d880149/320c76fa-5756-4998-a4e0-dd9cc43c92bf/trimble_logo.png", value: 80, currentprice: 40, sector: "Business", quantity: 2 },

        ]
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
                    <TimeLine startDate={league.startDate} endDate={league.endDate} portfolios={league.portfolios} accessCode={league.accessCode}></TimeLine>
                )
            }
            else {
                return (
                    <ValueLine portfolios={league.portfolios} winningValue={league.winningValue} accessCode={league.accessCode}></ValueLine>
                )
            }
        }
    }
    var accessString = league.accessCode.toString()



    return (
        <>
            {loading ? <LoadingSpinner /> : error ? <MessageAlert variant='danger'>{error}</MessageAlert> :
                <>
                    <div className="container-img">
                        <Image className="gameImage" src={league.image}></Image>
                        <div className="centeredGameImg">
                            <h1 className="ImgTxt">{league.leagueName}</h1><br></br>
                            <p className="ImgTxt">Access Code: <strong>{league.accessCode} </strong>
                                <ContentCopyIcon fontSize="small" onClick={() => { navigator.clipboard.writeText(accessString) }}>Copy</ContentCopyIcon></p>

                        </div>
                    </div>
                    <GameNavBar disPlayScreen={disPlayScreen} active={active} />

                    <Container>
                        {timeOrValueLine()}

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
                                    <GamePortfolio data={data.valueHistory} name={data.name} />
                                </Row>
                                <Row>
                                    <Col>
                                        <HoldingsCard data={data.holdings} remainder={data.remainder} />
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