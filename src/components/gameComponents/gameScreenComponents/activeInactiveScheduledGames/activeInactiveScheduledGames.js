import {Col} from "react-bootstrap"
import {useState, useEffect } from 'react'

/// Components ///
import LoadingSpinner from "../../../widgets/LoadingSpinner/LoadingSpinner"


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

    // active false and finished false - Game is scheduled for future, no trading
    // active false and finished true - Game Complete, no trading or joining
    return(
        <>
        {loading ? <LoadingSpinner /> :
        <>
        <Col>
            <h2>Active Games</h2>
             {activeGames.map((game) => (
                <p key={game.leagueName}>{game.leagueName}</p>                        
                            ))}
        </Col>
        <Col>
            <h2>Scheduled Games</h2>
            {scheduledGames.map((game) => (
                <p key={game.leagueName}>{game.leagueName}</p>                        
                            ))}
        </Col>
        <Col>
            <h2>Complete Games</h2>
            {completeGames.map((game) => (
                <p key={game.leagueName}>{game.leagueName}</p>                        
                            ))}
        </Col>
        </>}
        </>
    )
}

export default ActiveInactiveScheduledGames;