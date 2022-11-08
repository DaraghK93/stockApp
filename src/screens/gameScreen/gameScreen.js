/// Description:
//      This is the screen which is displayed when the user clicks into "game" on the nav bar 
import { useState } from 'react'
import { Container, Row} from "react-bootstrap"

//// Components ///
import ScreenSelectionRadioButton from "../../components/gameComponents/gameScreenComponents/screenSelectionRadioButton/screenSelectionRadioButton";
import CreateGameCard from '../../components/gameComponents/gameScreenComponents/createGameCard/createGameCard';
import ActiveInactiveScheduledGames from '../../components/gameComponents/gameScreenComponents/activeInactiveScheduledGames/activeInactiveScheduledGames';




function GameScreen(){
    // constant email holds the value of the input email address
    const [screen, setScreen] = useState('1')


    /// The choices for the screens, used for buttons at top o screen 
    var screenChocies = [
        {name: 'My Games', value:'1'},
        {name: 'Join a Game', value: '2'}
    ]


    // active: true and  finished:false - Game ongoing can trade
    // active false and finished false - Game is scheduled for future, no trading
    // active false and finished true - Game Complete, no trading or joining
    var games = {
        "active": [
            {
                "leagueName" : "Environmental Game", 
                "leagueType": "timeBased",
                "startDate": "2022-11-01T16:46:23.000Z",
                "endDate": "2022-11-20T16:46:23.000Z",
                "finished": false,
                "users": [{"username":"John"},{"username":"Paul"},{"username":"George"},{"username":"Ringo"}]
            },
            {
                "leagueName" : "Social Game", 
                "leagueType": "valueBased",
                "startDate": "2022-11-04T16:46:23.000Z",
                "winningValue": 300000,
                "finished": false,
                "users": [{"username":"John"},{"username":"Paul"},{"username":"George"},{"username":"Ringo"}]
            },
            {
                "leagueName" : "Governance Game", 
                "leagueType": "valueBased",
                "startDate": "2022-11-05T16:46:23.000Z",
                "winningValue": 300000,
                "finished": false,
                "users": [{"username":"John"},{"username":"Paul"},{"username":"George"},{"username":"Ringo"}]
            },
            {
                "leagueName" : "Governance Game", 
                "leagueType": "valueBased",
                "startDate": "2022-11-05T16:46:23.000Z",
                "winningValue": 300000,
                "finished": false,
                "users": [{"username":"John"},{"username":"Paul"},{"username":"George"},{"username":"Ringo"}]
            },
            {
                "leagueName" : "Governance Game", 
                "leagueType": "valueBased",
                "startDate": "2022-11-05T16:46:23.000Z",
                "winningValue": 300000,
                "finished": false,
                "users": [{"username":"John"},{"username":"Paul"},{"username":"George"},{"username":"Ringo"}]
            },
             {
                "leagueName" : "Governance Game", 
                "leagueType": "valueBased",
                "startDate": "2022-11-05T16:46:23.000Z",
                "winningValue": 300000,
                "finished": false,
                "users": [{"username":"John"},{"username":"Paul"},{"username":"George"},{"username":"Ringo"}]
            },
             {
                "leagueName" : "Governance Game", 
                "leagueType": "valueBased",
                "startDate": "2022-11-05T16:46:23.000Z",
                "winningValue": 300000,
                "finished": false,
                "users": [{"username":"John"},{"username":"Paul"},{"username":"George"},{"username":"Ringo"}]
            },
             {
                "leagueName" : "Governance Game", 
                "leagueType": "valueBased",
                "startDate": "2022-11-05T16:46:23.000Z",
                "winningValue": 300000,
                "finished": false,
                "users": [{"username":"John"},{"username":"Paul"},{"username":"George"},{"username":"Ringo"}]
            },
             {
                "leagueName" : "Governance Game", 
                "leagueType": "valueBased",
                "startDate": "2022-11-05T16:46:23.000Z",
                "winningValue": 300000,
                "finished": false,
                "users": [{"username":"John"},{"username":"Paul"},{"username":"George"},{"username":"Ringo"}]
            }
        ],
        "inactive":[
            {
                "leagueName" : "Next weeks Game", 
                "leagueType": "valueBased",
                "startDate": "2022-11-18T16:46:23.000Z",
                "winningValue": 300000,
                "finished": false,
                "users": [{"username":"John"},{"username":"Paul"},{"username":"George"},{"username":"Ringo"}]
            },
            {
                "leagueName" : "Previous weeks Game", 
                "leagueType": "valueBased",
                "startDate": "2022-11-01T16:46:23.000Z",
                "winningValue": 300000,
                "finished": true,
                "users": [{"username":"John"},{"username":"Paul"},{"username":"George"},{"username":"Ringo"}]
            }
        ]
    }

    return(
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
                <ActiveInactiveScheduledGames games={games}/>
            </Row>
            </>)
            :
            (
                <Row>
                    Join a Game Screen
                </Row>
            )}
        </Container>
    
        )

}

export default GameScreen;