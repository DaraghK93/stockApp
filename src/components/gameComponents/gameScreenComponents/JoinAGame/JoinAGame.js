import {Card,Form,Row,Col,Button} from "react-bootstrap"
import InfoButtonModal from "../../../widgets/InfoButtonModal/InfoButtonModal"
import {Link} from 'react-router-dom';
import FormContainer from "../../../layout/FormContainer/FormContainer";
import {useState} from 'react'
import {APIName} from '../../../../constants/APIConstants'
import { API } from "aws-amplify";
import MessageAlert from "../../../widgets/MessageAlert/MessageAlert";
import LoadingSpinner from "../../../widgets/LoadingSpinner/LoadingSpinner";
import {useSelector,useDispatch} from 'react-redux';
import {updateActivePortfolios} from '../../../../actions/portfolioActions';
import Modal from 'react-bootstrap/Modal';
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
import Confetti from 'react-confetti'
import { ContentPasteSearchOutlined } from "@mui/icons-material";

function JoinAGame(){
    const [accessCode, setAccessCode] = useState('')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [league, setleague] = useState("")
    const [leagueName, setLeagueName] = useState("")
    const [LeagueID, setLeagueID] = useState("")
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    /// Redux
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const {userInfo} = user
    const userToken = userInfo.token

    const handleSubmit = async(event) =>{
        event.preventDefault()
        try{
            const handleShow = () => setShow(true);
            setLoading(true)
            setError("")
            setLeagueName("")
            setleague("")
            setLeagueID("")
            let path = '/api/league/joinleague'
            // auth token in header
            // access token in the body 
            let myInit = {
                    headers : {"x-auth-token": userToken},       
                    body:{
                        "accessCode":accessCode
                    }
            }
            /// Send the request 
            const res = await API.post(APIName, path, myInit)
            setleague(res)
            setLeagueName(res.newLeague.leagueName)
            setLeagueID(res.newLeague._id)

            console.log("League:", league)
            console.log("League ID:",LeagueID)
            console.log("Res Type:",typeof(res))
            console.log("LeagueName Type:",typeof(LeagueName))
            console.log("LeagueID Type:",typeof(LeagueID))

            console.log("League ID here:",LeagueID)
            if (res.newLeague.active){
                /// If the game being joined is active then update the active portfolios state in redux 
                /// Called becuase joining a game will also create a new portfolio for that game 
                dispatch(updateActivePortfolios(userToken))  
            }
            setLoading(false)
        }catch(error){
            /// Will be hit if error in the POST 
            setError(error.response.data.errormessage)
            setLoading(false)
        }
    }

    return(
        <Card>
            <Card.Title className="gameOptionsCardTitle">Join Game
            <InfoButtonModal title="Join A Game" info={
                        <>
                        <p>Games can be joined using an access code</p>
                        <p>An access code can be obtained from the game details screen of an existing game</p>
                        <p>Get in touch with the creator of the game or a player part of the game you want to join and ask for the access code</p>
                        <p>Dont have an access code? <Link to="/game/creategame">Create a New Game</Link></p>
                        </>
                   }/>
            </Card.Title>
            <Card.Body>
                <Card.Text className="gameOptionsCardText">Enter a Game Access Code</Card.Text>
                   <FormContainer>
                        <Form  onSubmit={handleSubmit}>
                            <Form.Control
                                type="text"
                                placeholder="Access Code"
                                onChange={(e) => setAccessCode(e.target.value)}
                            ></Form.Control>
                        <Row>
                            <Col className="text-center py-4">
                                <Button 
                                    variant="primary" 
                                    type="submit"
                                    disabled={accessCode.length === 0}
                                    >
                                    Join Game!
                                </Button>
                            </Col>
                        </Row>    
                        </Form>
                   </FormContainer>
                    {error && <MessageAlert variant="danger">{error}</MessageAlert>}
                    {/* {leagueName && <MessageAlert variant="success">Succesfully Joined <span className="bolded">{leagueName}</span>, Goodluck!</MessageAlert>} */}
                {/* {typeof leagueName !== "undefined" && <JoinGameSuccess showState={show} setShowState={setShow} leagueNameSuccess={leagueName}/>} */}
                    
                {leagueName &&
                    <Modal show={setShow} onHide={handleClose} backdrop="static">
                        <Modal.Body>
                            <Row xl={1} md={1} sm={1} xs={1} className="textCenter">
                                <h2 className="greenSuccess">Succesfully joined {leagueName}!</h2>
                                <Col className="w-100 mb-4">
                                    <CheckCircleOutlineSharpIcon className="greenSuccess" style={{ "fontSize": "10rem" }} />
                                </Col>
                                <Confetti numberOfPieces={500} recycle={false} />
                            </Row>
                            <Row md={2} className="textCenter">
                                <Col>
                                    <Link className="w-100" to={`/game`}>
                                        <Button className="mb-2 w-100">Go To My Games</Button>
                                    </Link>
                                </Col>
                                <Col>
                                    <Link className="w-100" to={`/game/`}>
                                        <Button className="mb-2 w-100">Go To Stock Discovery</Button>
                                    </Link>
                                </Col>
                            </Row>
                        </Modal.Body>
                    </Modal>
                }
                    {loading && <LoadingSpinner/>}
            </Card.Body>
        </Card>
    )
}

export default JoinAGame