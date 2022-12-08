import { Modal, Button} from "react-bootstrap";
import {useState,useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {APIName} from '../../../../constants/APIConstants'
import { API } from "aws-amplify";
import MessageAlert from "../../../widgets/MessageAlert/MessageAlert";
import { Link } from "react-router-dom"
import LoadingSpinner from "../../../widgets/LoadingSpinner/LoadingSpinner"
import {updateActivePortfolios} from '../../../../actions/portfolioActions';


function AreYouSure({showState,setShowState, leagueId, portfolioId, isAdmin}){
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("")
    
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const { userInfo } = user;
    const userToken = userInfo.token


    useEffect(() => {
       /// If these change rest the error on screen, means they went back and fixed/changed something
       /// Old error may not make sense to be shown, will be set again if something wrong with request
       setError("")
       setSuccess("")
    },[])


    const deleteLeague = async () => {
        try{
                /// Set the portfolio Loading to true and reset error
                setLoading(true)
                setError()

                const path = '/api/league/deleteleague'
                let myInit = {
                    headers : {"x-auth-token": userToken},       
                    body: {
                        leagueId: leagueId,
                    }
                }
                /// Send the request 
                const res = await API.put(APIName, path, myInit)
                /// Set the success message using the
                setSuccess(`League Deleted Successfully! This will now appear in your Completed Games`)
                setLoading(false)
                dispatch(updateActivePortfolios(userInfo.token)) 
        }catch(error){
            setError(error.response.data.errormessage)
            setLoading(false)
        }
     }

     const leaveLeague = async () => {
        try{
                /// Set the portfolio Loading to true and reset error
                setLoading(true)
                setError()

                const path = '/api/league/leaveleague'
                let myInit = {
                    headers : {"x-auth-token": userToken},       
                    body: {
                        portfolioId: portfolioId,
                        leagueId: leagueId
                    }
                }
                /// Send the request 
                const res = await API.post(APIName, path, myInit)
                /// Set the success message using the
                setSuccess(`Succesfully left the league! The associated portfolio has also been deleted.`)
                setLoading(false)
                dispatch(updateActivePortfolios(userInfo.token)) 
        }catch(error){
            setError(error.response.data.errormessage)
            setLoading(false)
        }
     }


    const handleClose = () => {
        /// On close reset the success and errors, they may be going back to make another trade
        setError("")
        setSuccess("")
        setShowState(false);
    }

    return(
        <Modal centered show={showState} onHide={handleClose}>
        <Modal.Header closeButton>
            {
            success &&
            <Modal.Title>Are you happy with yourself?</Modal.Title>
            }
            {
                !success &&
            isAdmin === true &&
                    <Modal.Title>Are you sure you want to delete this league?</Modal.Title>
                    }
            {
                !success &&
            isAdmin === false &&
                    <Modal.Title>Are you sure you want to leave this league?</Modal.Title>
                    }
            
        </Modal.Header>
        <Modal.Body>
            {error && <MessageAlert variant="danger">{error}</MessageAlert>}
            {success && <MessageAlert variant="success">{success}</MessageAlert>}
            {loading && <LoadingSpinner/>}
            {/* hi */}
            {!success &&
            isAdmin === true &&
                    <div>
                        <span className="semibolded">#StopTheCount!</span>
                        <p>By clicking confirm, this league will automatically finish and will
                        be found on the 'Games' page under 'Completed'. League members will no longer be able to 
                        trade stocks in the associated portfolio. </p>
                        <p>The final league standings will be based on the standings at this current 
                        time.
                    </p>
                    </div>
                    }
            {!success &&
            isAdmin === false &&
                    <div>
                        <span className="semibolded">The Irish Goodbye</span>
                        <p>By clicking <b>confirm</b>, you will be removed from this league and no one will notice until it's too late. The portfolio 
                        associated to this league will also be deleted.</p>
                    </div>
                    }
        </Modal.Body>
        <Modal.Footer>
            {!success &&
            <Button variant="danger" onClick={handleClose}>
                Cancel
        </Button>}
        {!success &&
            isAdmin === true &&
        <Button variant="success" onClick={deleteLeague}>
            Confirm
        </Button>
        }  
        {!success &&
            isAdmin === false &&
        <Button variant="success" onClick={leaveLeague}>
            Confirm
        </Button>
        }  
        {success &&
        <Link className="w-100" to={'/game'}>
        <Button>
            Return to Games
        </Button>
        </Link>
        }  
        </Modal.Footer>
    </Modal>
    )
}

export default AreYouSure;