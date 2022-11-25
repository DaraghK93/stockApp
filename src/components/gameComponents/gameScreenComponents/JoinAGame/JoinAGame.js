import {Card,Form,Row,Col,Button} from "react-bootstrap"
import InfoButtonModal from "../../../widgets/InfoButtonModal/InfoButtonModal"
import {Link} from 'react-router-dom';
import FormContainer from "../../../layout/FormContainer/FormContainer";
import {useState} from 'react'
import {APIName} from '../../../../constants/APIConstants'
import { API } from "aws-amplify";
import MessageAlert from "../../../widgets/MessageAlert/MessageAlert";
import LoadingSpinner from "../../../widgets/LoadingSpinner/LoadingSpinner";
import {useSelector} from 'react-redux';


function JoinAGame(){
    const [accessCode, setAccessCode] = useState('')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [leagueName, setLeagueName] = useState("")

    /// Redux
    const user = useSelector((state) => state.user)
    const {userInfo} = user
    const userToken = userInfo.token

    const handleSubmit = async(event) =>{
        event.preventDefault()
        try{
            setLoading(true)
            setError("")
            setLeagueName("")
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
            setLeagueName(res.newLeague.leagueName)
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
                    {leagueName && <MessageAlert variant="success">Succesfully Joined <span className="bolded">{leagueName}</span>, Goodluck!</MessageAlert>}
                    {loading && <LoadingSpinner/>}
            </Card.Body>
        </Card>
    )
}

export default JoinAGame