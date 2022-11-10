import {Dropdown,Card,Row,Col,ButtonGroup,ToggleButton,Image} from "react-bootstrap"
import {useSelector} from 'react-redux';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GameCreationOptionsCard from "./GameCreationOptionsCard";


function GameNameTypeImage({gameName, setGameName,gameType, setGameType, gameImage, setGameImage}){
    /// Redux ///
    const user = useSelector((state) => state.user)
    // Get the userInfo piece of state, dont need loading and error
    const {userInfo} = user; 

    var gameNames = [
        `${userInfo.firstname}'s Stock Trading Game`,
        `${userInfo.firstname}'s Fantasy League`,
        `${userInfo.firstname}'s Big Stock Challange`,
        `${userInfo.firstname}'s Investment League`
    ]

    var images = [
        "/stock_photo_1.jpg",
        "/stock_photo_2.jpg",
        "/stock_photo_3.jpg",
        "/stock_photo_4.jpg"
    ]

    console.log(gameImage)

    return(
        <>
            <h1>Game Details</h1>
        </>
    )
}


export default  GameNameTypeImage