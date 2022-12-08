import { Modal, Button} from "react-bootstrap";
import {useState,useEffect} from 'react';
import {useSelector} from 'react-redux';
import {APIName} from '../../../../constants/APIConstants'
import { API } from "aws-amplify";
import MessageAlert from "../../../widgets/MessageAlert/MessageAlert";
import LoadingSpinner from "../../../widgets/LoadingSpinner/LoadingSpinner";

function AreYouSure({showState,setShowState, leagueId, isAdmin}){
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("")
    
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
                        leagueId: leagueId
                    }
                }
                /// Send the request 
                const res = await API.put(APIName, path, myInit)
                /// Set the success message using the
                setSuccess(`League Deleted Successfully! This will now appear in your Complete Games`)
                setLoading(false)
                console.log(res)
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
            {isAdmin === true &&
                    <Modal.Title>Are you sure you want to delete this league?</Modal.Title>
                    }
                    {
                        isAdmin === false &&
                        <Modal.Title>Are you sure you want to leave this league?</Modal.Title>
                            }
            
        </Modal.Header>
        <Modal.Body>
            {error && <MessageAlert variant="danger">{error}</MessageAlert>}
            {success && <MessageAlert variant="success">{success}</MessageAlert>}
            {loading && <LoadingSpinner/>}
            hi
            {/* {
            isAdmin &&
            "hi"
                    }
            {
            !isAdmin &&
            "not hi"
                } */}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
                Cancel
        </Button>
        <Button variant="success" onClick={deleteLeague}>
            Confirm
        </Button>
        </Modal.Footer>
    </Modal>
    )
}

export default AreYouSure;