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
        <Link to={'/game/creategame}'} style={{ textDecoration: 'none' }}>
           <Card className="createGameCard">
            <Card.Body>
                <Card.Title>Create a Game</Card.Title>
                <Card.Text>{userInfo.firstname} as the host</Card.Text>
                <Card.Text>Invite friends and see who will come out on top</Card.Text>
                <AddCircleOutlineIcon fontSize="large"/>
            </Card.Body>
        </Card> 
        </Link>
        
    )
}

export default CreateGameCard;