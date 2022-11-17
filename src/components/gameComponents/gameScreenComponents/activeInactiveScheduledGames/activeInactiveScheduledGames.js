/// Description:
//      This component takes in an array of games and will give out a display which groups them into active, sheduled and complete 
//      This was put into its own component as used on "My Games" but can also be used to show public games in "Join a Game"
import {Row,Col} from "react-bootstrap"
/// Components ///
import SideScrollMenu from "../../../widgets/SideScrollMenu/SideScrollMenu"
import GameCard from "../gameCard/GameCard"
import MessageAlert from "../../../widgets/MessageAlert/MessageAlert";


function ActiveInactiveScheduledGames({activeGames,scheduledGames,completeGames}){
    return(
        <>
        <Row className="pt-4" md={1} xs={1}>
            <Col>
                <h2>Active Games</h2>
            </Col>
            <Col>
                {activeGames.length === 0 ? <MessageAlert variant="info">No Active Games. Create or join an active game!</MessageAlert>
                :
                <SideScrollMenu className="h100">
                    {activeGames.map((game) => ( 
                        <div className='sideScrollCard' key={game._id}>
                            <GameCard game={game}/>
                        </div>         
                                ))}
                </SideScrollMenu>
                }
                
            </Col>
            
        </Row>
        <Row className="pt-4" md={1} xs={1}>
            <Col>
                <h2>Scheduled Games</h2>
            </Col>
            <Col>
            {scheduledGames.length === 0 ? <MessageAlert variant="info">No Scheduled Games. Create or join a scheduled game!</MessageAlert>
            :
                <SideScrollMenu className="h100">
                    {scheduledGames.map((game) => (
                        <div className='sideScrollCard' key={game._id}>
                            <GameCard game={game}/>
                        </div>         
                                ))}
                </SideScrollMenu> 
            } 
            </Col>
                           
        </Row>
        <Row className="pt-4" md={1} xs={1}>
            <Col>
                <h2>Complete Games</h2>
            </Col>
            <Col>
            {completeGames.length === 0 ? <MessageAlert variant="info">Once a game you are part of completes it will appear here!</MessageAlert>
            :
                <SideScrollMenu className="h100">
                    {completeGames.map((game) => (
                        <div className='sideScrollCard' key={game._id}>
                            <GameCard game={game}/>
                        </div>         
                                ))}
                </SideScrollMenu>
            }
            </Col>
            
        </Row>
    </>

    )
}

export default ActiveInactiveScheduledGames;