import {Row, Container } from 'react-bootstrap';
import { APIName } from '../../../constants/APIConstants'
import { useState, useEffect } from 'react';
import { API } from "aws-amplify";
import LoadingSpinner from '../../widgets/LoadingSpinner/LoadingSpinner';
import MessageAlert from '../../widgets/MessageAlert/MessageAlert';
import StockSideScrollMenu from '../stockSideScrollMenu/stockSideScrollMenu';

function StockSearchResults({keyword}) {
    const [stocks, setStock] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

     useEffect(() => {
     const getStocks = async () =>{
            try{
                setLoading(true)
                let path = `/api/stock?keyword=${keyword}`
                const res = await API.get(APIName, path)
                setStock(res)
                setLoading(false) 
            }catch(error){
                console.log(error)
                setError(error.response.data.errormessage);
                setLoading(false);
            }
        }
        getStocks()
    },[keyword])




    return(
        <>
        {loading ? <LoadingSpinner /> : error  ? <MessageAlert variant='danger'>{error}</MessageAlert> :
        <>
        <Container>
        <Row md={1} xs={1}>
         <StockSideScrollMenu data={stocks}/>
         </Row>
         </Container>       
        </>
         
        }</>
                           
    )

}

export default StockSearchResults