/// Description:
//      This is the screen which is displayed when the user clicks into "game" on the nav bar 
import { useState } from 'react'
import { Container, Row} from "react-bootstrap"

//// Components ///
import ScreenSelectionRadioButton from "../../components/gameComponents/gameScreenComponents/screenSelectionRadioButton/screenSelectionRadioButton";
import CreateGameCard from '../../components/gameComponents/gameScreenComponents/createGameCard/createGameCard';
import ActiveInactiveScheduledGames from '../../components/gameComponents/gameScreenComponents/activeInactiveScheduledGames/activeInactiveScheduledGames';




function GameScreen(){
    // screen will either be 1 or 2, shows My games or join a game 
    const [screen, setScreen] = useState('1')


    /// The choices for the screens, used for buttons at top of screen 
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
                "id": "1",
                "leagueName" : "Environmental Game", 
                "leagueType": "timeBased",
                "startDate": "2022-11-01T16:46:23.000Z",
                "endDate": "2022-11-20T16:46:23.000Z",
                "finished": false,
                "image":"stock_photo_1.jpg",
                "users": [{"username":"John"},{"username":"Paul"},{"username":"George"},{"username":"Ringo"}]
            },
            {
                "id": "2",
                "leagueName" : "Social Game", 
                "leagueType": "valueBased",
                "startDate": "2022-11-04T16:46:23.000Z",
                "winningValue": 300000,
                "finished": false,
                "image":"stock_photo_2.jpg",
                "users": [{"username":"John"},{"username":"Paul"},{"username":"George"},{"username":"Ringo"}]
            },
            {
                "id": "3",
                "leagueName" : "Governance Game", 
                "leagueType": "valueBased",
                "startDate": "2022-11-05T16:46:23.000Z",
                "winningValue": 300000,
                "finished": false,
                "image":"stock_photo_3.jpg",
                "users": [{"username":"John"},{"username":"Paul"},{"username":"George"},{"username":"Ringo"}]
            },
            {
                "id": "4",
                "leagueName" : "Governance Game", 
                "leagueType": "valueBased",
                "startDate": "2022-11-05T16:46:23.000Z",
                "winningValue": 300000,
                "finished": false,
                "image":"stock_photo_4.jpg",
                "users": [{"username":"John"},{"username":"Paul"},{"username":"George"},{"username":"Ringo"}]
            },
              {
                "id": "5",
                "leagueName" : "Environmental Game", 
                "leagueType": "timeBased",
                "startDate": "2022-11-01T16:46:23.000Z",
                "endDate": "2022-11-20T16:46:23.000Z",
                "finished": false,
                "image":"stock_photo_1.jpg",
                "users": [{"username":"John"},{"username":"Paul"},{"username":"George"},{"username":"Ringo"}]
            },
            {
                "id": "6",
                "leagueName" : "Social Game", 
                "leagueType": "valueBased",
                "startDate": "2022-11-04T16:46:23.000Z",
                "winningValue": 300000,
                "finished": false,
                "image":"stock_photo_2.jpg",
                "users": [{"username":"John"},{"username":"Paul"},{"username":"George"},{"username":"Ringo"}]
            },
            {
                "id": "7",
                "leagueName" : "Governance Game", 
                "leagueType": "valueBased",
                "startDate": "2022-11-05T16:46:23.000Z",
                "winningValue": 300000,
                "finished": false,
                "image":"stock_photo_3.jpg",
                "users": [{"username":"John"},{"username":"Paul"},{"username":"George"},{"username":"Ringo"}]
            },
            {
                "id": "8",
                "leagueName" : "Governance Game", 
                "leagueType": "valueBased",
                "startDate": "2022-11-05T16:46:23.000Z",
                "winningValue": 300000,
                "finished": false,
                "image":"stock_photo_4.jpg",
                "users": [{"username":"John"},{"username":"Paul"},{"username":"George"},{"username":"Ringo"}]
            }
        ],
        "inactive":[
            {
                "id": "9",
                "leagueName" : "Next weeks Game", 
                "leagueType": "timeBased",
                "startDate": "2022-11-18T16:46:23.000Z",
                "endDate": "2022-11-20T16:46:23.000Z",
                "winningValue": 300000,
                "finished": false,
                "image":"stock_photo_2.jpg",
                "users": [{"username":"John"},{"username":"Paul"},{"username":"George"},{"username":"Ringo"}]
            },
            {
                "id": "10",
                "leagueName" : "Next weeks Game", 
                "leagueType": "valueBased",
                "startDate": "2022-11-18T16:46:23.000Z",
                "winningValue": 300000,
                "finished": false,
                "image":"stock_photo_3.jpg",
                "users": [{"username":"John"},{"username":"Paul"},{"username":"George"},{"username":"Ringo"}]
            },
            {
                "id": "11",
                "leagueName" : "Next weeks Game", 
                "leagueType": "valueBased",
                "startDate": "2022-11-18T16:46:23.000Z",
                "winningValue": 300000,
                "finished": false,
                "image":"stock_photo_4.jpg",
                "users": [{"username":"John"},{"username":"Paul"},{"username":"George"},{"username":"Ringo"}]
            },
            {
                "id": "12",
                "leagueName" : "Next weeks Game", 
                "leagueType": "valueBased",
                "startDate": "2022-11-18T16:46:23.000Z",
                "winningValue": 300000,
                "finished": false,
                "image":"stock_photo_1.jpg",
                "users": [{"username":"John"},{"username":"Paul"},{"username":"George"},{"username":"Ringo"}]
            },
            {
                "id": "13",
                "leagueName" : "Next weeks Game", 
                "leagueType": "valueBased",
                "startDate": "2022-11-18T16:46:23.000Z",
                "winningValue": 300000,
                "finished": false,
                "image":"stock_photo_2.jpg",
                "users": [{"username":"John"},{"username":"Paul"},{"username":"George"},{"username":"Ringo"}]
            },
             {
                "id": "14",
                "leagueName" : "Next weeks Game", 
                "leagueType": "valueBased",
                "startDate": "2022-11-18T16:46:23.000Z",
                "winningValue": 300000,
                "finished": false,
                "image":"stock_photo_1.jpg",
                "users": [{"username":"John"},{"username":"Paul"},{"username":"George"},{"username":"Ringo"}]
            },
            {
                "id": "15",
                "leagueName" : "Previous weeks Game", 
                "leagueType": "valueBased",
                "startDate": "2022-11-01T16:46:23.000Z",
                "winningValue": 300000,
                "finished": true,
                "image":"stock_photo_2.jpg",
                "users": [{"username":"John"},{"username":"Paul"},{"username":"George"},{"username":"Ringo"}]
            },
            {
                "id": "16",
                "leagueName" : "Previous weeks Game", 
                "leagueType": "valueBased",
                "startDate": "2022-11-01T16:46:23.000Z",
                "winningValue": 300000,
                "finished": true,
                "image":"stock_photo_4.jpg",
                "users": [{"username":"John"},{"username":"Paul"},{"username":"George"},{"username":"Ringo"}]
            },
            {
                "id": "17",
                "leagueName" : "Previous weeks Game", 
                "leagueType": "valueBased",
                "startDate": "2022-11-01T16:46:23.000Z",
                "winningValue": 300000,
                "finished": true,
                "image":"stock_photo_3.jpg",
                "users": [{"username":"John"},{"username":"Paul"},{"username":"George"},{"username":"Ringo"}]
            },
            {
                "id": "18",
                "leagueName" : "Previous weeks Game", 
                "leagueType": "valueBased",
                "startDate": "2022-11-01T16:46:23.000Z",
                "winningValue": 300000,
                "finished": true,
                "image":"stock_photo_1.jpg",
                "users": [{"username":"John"},{"username":"Paul"},{"username":"George"},{"username":"Ringo"}]
            },
            {
                "id": "19",
                "leagueName" : "Previous weeks Game", 
                "leagueType": "valueBased",
                "startDate": "2022-11-01T16:46:23.000Z",
                "winningValue": 300000,
                "finished": true,
                "image":"stock_photo_2.jpg",
                "users": [{"username":"John"},{"username":"Paul"},{"username":"George"},{"username":"Ringo"}]
            },
            {
                "id": "20",
                "leagueName" : "Previous weeks Game", 
                "leagueType": "valueBased",
                "startDate": "2022-11-01T16:46:23.000Z",
                "winningValue": 300000,
                "finished": true,
                "image":"stock_photo_2.jpg",
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