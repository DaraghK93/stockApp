/// Description:
//      This is the screen which is displayed when the user clicks into "game" on the nav bar 
import { APIName } from '../../constants/APIConstants'
import { useState,useEffect} from 'react'
import {useSelector} from 'react-redux';
import { Container, Row} from "react-bootstrap"
import { API } from "aws-amplify";
import LoadingSpinner from '../../components/widgets/LoadingSpinner/LoadingSpinner';
import MessageAlert from '../../components/widgets/MessageAlert/MessageAlert';

//// Components ///
import ScreenSelectionRadioButton from "../../components/gameComponents/gameScreenComponents/screenSelectionRadioButton/screenSelectionRadioButton";
import CreateGameCard from '../../components/gameComponents/gameScreenComponents/createGameCard/createGameCard';
import ActiveInactiveScheduledGames from '../../components/gameComponents/gameScreenComponents/activeInactiveScheduledGames/activeInactiveScheduledGames';
import JoinAGame from '../../components/gameComponents/gameScreenComponents/JoinAGame/JoinAGame';

function GameScreen(){
    // screen will either be 1 or 2, shows My games or join a game 
    const [screen, setScreen] = useState('1')
    const [activeGames, setActiveGames] = useState([])
    const [scheduledGames, setScheduledGames] = useState([])
    const [completeGames, setCompleteGames] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    //Redux
    const user = useSelector((state) => state.user)
    const {userInfo} = user
    const userToken = userInfo.token

    /// The choices for the screens, used for buttons at top of screen 
    var screenChocies = [
        {name: 'My Games', value:'1'},
        {name: 'Join a Game', value: '2'}]


    useEffect(() => {
        const getGames = async () => {
               try{
                   /// Set loading to true
                    setLoading(true)
                    let path = '/api/league/myleagues'
                    // send the token as a header
                    const params = {
                            headers : {"x-auth-token": userToken}
                            }
                    const res = await API.get(APIName, path, params)
                    setActiveGames(res.leagues[0].active)
                    setScheduledGames(res.leagues[0].scheduled)
                    setCompleteGames(res.leagues[0].complete)
                   /// Set loading false 
                    setLoading(false)
               }catch(error){
                   console.log(error)
                   setError(error.response.data.errormessage);
                   setLoading(false);
               }
           }
           getGames()
       },[userToken])
        

    return(
        <>
        {loading ? <LoadingSpinner /> : error  ? <MessageAlert variant='danger'>{error}</MessageAlert> :
    
        <Container>
            <Row className="py-3" lg={1} md={1} xs={1}>
                <ScreenSelectionRadioButton choices={screenChocies} state={screen} setter={setScreen}/>
            </Row>
            {screen === "1" ?(
            <>
            <Row className="px-2" lg={1} md={1} xs={1}>
                <CreateGameCard/>
            </Row>
            <Row  lg={1} md={1} xs={1}>
                <ActiveInactiveScheduledGames activeGames={activeGames} 
                                              scheduledGames={scheduledGames}
                                              completeGames={completeGames}/>
            </Row>
            </>)
            :
            (
                <Row  style={{"textAlign":"center","alignItems":"center"}}>
                    <JoinAGame/>
                </Row>
            )}
        </Container>}
        </>
        )}

export default GameScreen;