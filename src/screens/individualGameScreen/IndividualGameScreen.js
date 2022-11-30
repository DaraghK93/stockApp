import { useState, useEffect } from "react";
import GameNavBar from "../../components/gameComponents/individualGameScreenComponents/gameNavigation/GameNavBar";
import { Container, Image, Row, Col } from 'react-bootstrap';
import GamePortfolio from "../../components/gameComponents/individualGameScreenComponents/gameNavigation/GamePortfolio";
import HoldingsCard from "../../components/portfolioComponents/HoldingsCard/HoldingsCard";
import LeaderBoard from "../../components/gameComponents/individualGameScreenComponents/gameNavigation/LeaderBoard";
/// API ///
import { APIName } from '../../constants/APIConstants'
import { API } from "aws-amplify";

/// Redux ///
import { useSelector } from 'react-redux';

function IndividualGameScreen() {

    /// League State ///
    const [loading, setLoading] = useState(true);
    const [league, setLeague] = useState('');
    const [error, setError] = useState("");

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
                const res = await API.get(APIName, path, myInit)
                console.log(res)
                // Set the state for the stock and loading to false 
                setLeague(res)
                setLoading(false)
            } catch (error) {
                // Log the error 
                console.log(error)
                // Set the error message to be displayed on the page 
                setError(error.response.data.errormessage)
                setLoading(false)
            }
        }
        getLeagueInfo();
    }, [userToken])




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

    const [screen, setScreen] = useState("")
    const [active, setActive] = useState("4")


    useEffect(() => {
        setScreen(LeaderBoard)
        setActive("4")
    }, [])


    const disPlayScreen = (e) => {
        setActive(e.target.id)
        if (e.target.id === "1") {
            setScreen(<><br></br><h2>This is rules screen</h2></>)
        }
        else if (e.target.id === "2") {
            setScreen(<><br></br><h2>This is stocks screen</h2></>)
        }
        else if (e.target.id === "3") {
            setScreen(
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

            )
        }
        else if (e.target.id === "4") {
            setScreen(
                <>
                    <LeaderBoard />
                </>)
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

            <Container>
                <h3>Timeline goes here</h3>
            </Container>
            {screen}

        </>
    )
}

export default IndividualGameScreen;