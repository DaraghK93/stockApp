/// Description:
//      This component takes in an array of games and will give out a display which groups them into active, sheduled and complete 
//      This was put into its own component as used on "My Games" but can also be used to show public games in "Join a Game"

import {Row,Col} from "react-bootstrap"
import {useState, useEffect } from 'react'

/// Components ///
import LoadingSpinner from "../../../widgets/LoadingSpinner/LoadingSpinner"
import SideScrollMenu from "../../../widgets/SideScrollMenu/SideScrollMenu"
import GameCard from "../gameCard/GameCard"


function ActiveInactiveScheduledGames({games}){
    const [activeGames, setActiveGames] = useState([])
    const [scheduledGames, setScheduledGames] = useState([])
    const [completeGames, setCompleteGames] = useState([])
    const [loading, setLoading] = useState(true)

    /// Sort the games here first avoids iterating through them and confusing logic in return statement 
    useEffect(() => {
     const sortGames = () =>{
            try{
                /// Set loading to true
                setLoading(true)
                // active: true and  finished:false - Game ongoing can trade
                // active false and finished false - Game is scheduled for future, no trading
                // active false and finished true - Game Complete, no trading or joining
                /// The active games will always be in active list 
                setActiveGames(games.active)
                // An inactive game can either be scheduled or finished 
                let completeGames = [] 
                let scheduledGames = [] 
                for (let i in games.inactive){
                    if (games.inactive[i].finished === false){
                        /// Game is not finished means its scheduled 
                        scheduledGames.push(games.inactive[i])
                    }else if(games.inactive[i].finished === true){
                        /// Game is finished means its complete 
                        completeGames.push(games.inactive[i])
                    }
                /// Set the state 
                setScheduledGames(scheduledGames);
                setCompleteGames(completeGames);
                /// Set loading false 
                setLoading(false)
                }

            }catch(error){
                console.log(error)
                //setError(error.response.data.errormessage);
                setLoading(false);
            }
        }
        sortGames()
    },[games])

    
    return(
        <>
        {loading ? <LoadingSpinner /> :
        <>
        <Row className="pt-4" md={1} xs={1}>
            <Col>
                <h2>Active Games</h2>
            </Col>
            <Col>
                <SideScrollMenu className="h100">
                    {activeGames.map((game) => (
                        <div className='sideScrollCard' key={game.id}>
                            <GameCard game={game}/>
                        </div>         
                                ))}
                </SideScrollMenu>
            </Col>
            
        </Row>
        <Row className="pt-4" md={1} xs={1}>
            <Col>
                <h2>Scheduled Games</h2>
            </Col>
            <Col>
                <SideScrollMenu className="h100">
                    {scheduledGames.map((game) => (
                        <div className='sideScrollCard' key={game.id}>
                            <GameCard game={game}/>
                        </div>         
                                ))}
                </SideScrollMenu>  
            </Col>
                           
        </Row>
        <Row className="pt-4" md={1} xs={1}>
            <Col>
                <h2>Complete Games</h2>
            </Col>
            <Col>
                <SideScrollMenu className="h100">
                    {completeGames.map((game) => (
                        <div className='sideScrollCard' key={game.id}>
                            <GameCard game={game}/>
                        </div>         
                                ))}
                </SideScrollMenu>
            </Col>
            
        </Row>
        </>}
        </>
    )
}

export default ActiveInactiveScheduledGames;