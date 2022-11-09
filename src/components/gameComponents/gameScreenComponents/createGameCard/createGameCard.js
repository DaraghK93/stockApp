/// Description:
//      This is the create a game card 
import { Card} from 'react-bootstrap';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux';


function CreateGameCard(){
    /// Redux ///
    const user = useSelector((state) => state.user)
    // Get the userInfo piece of state, dont need loading and error
    // The users name will be shown in top corner of nav 
    const {userInfo} = user; 

    return(
        <Link to={'/game/creategame'} style={{ textDecoration: 'none' }}>
           <Card className="createGameCard">
            <Card.Img className="creatGameCardImage" src="create_game_image.jpg" alt="Card image" />
            <Card.ImgOverlay >
            <Card.Body>
                <Card.Title className="createGameCardHeading">Create a Game</Card.Title>
                <Card.Text className="createGameCardTextBody">{userInfo.firstname} as the host</Card.Text>
                <Card.Text className="createGameCardTextBody">Invite friends and see who will come out on top</Card.Text>
                <AddCircleOutlineIcon className="createGameCardAddIcon" fontSize="large"/>
            </Card.Body>
        </Card.ImgOverlay>
        </Card> 
        </Link>
        
    )
}

export default CreateGameCard;