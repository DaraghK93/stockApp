import {Row,Col,Card} from 'react-bootstrap'
import { useState, useEffect } from 'react';
import LoadingSpinner from '../../widgets/LoadingSpinner/LoadingSpinner';
import MessageAlert from '../../widgets/MessageAlert/MessageAlert';
import NewsArticleCard from '../newsArticleCard/NewsArticleCard'


/// API ///
import { APIName } from '../../../constants/APIConstants'
import { API } from "aws-amplify";


function NewsArticleContainer({symbol,shortname,longname}){
    
    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState('');
    const [error, setError] = useState("");

    useEffect(() => {
        /// getArticles ///
        // Description:
        //  Makes a GET request to the backend route GET /api/newsarticles
        const getStockInfo = async () => {
            try {
                // Request is being sent set loading true 
                setLoading(true);
                // get the symbol from the url string, use regex to extract capital letters only
                const symbol = window.location.href.replace(/[^A-Z]/g, '');
                // Set the path and use symbol to get single stock
                let path = `/api/newsarticles?symbol=${symbol}&shortname=${shortname}&longname=${longname}`
                // Send the request with API package
                const res = await API.get(APIName, path)
                // Set the state for the stock and loading to false 
                setArticles(res);
                setLoading(false);
            } catch (error) {
                // Log the error 
                console.log(error);
                // Set the error message to be displayed on the page 
                setError(error.response.data.errormessage);
                setLoading(false);
            }
        }
        getStockInfo();
    }, [symbol,longname,shortname])


    return(
        <Card id="newsCardContainer" className="newsCardContainer">
        <h2 className="newsCardContainerHeading">News Feed</h2>
        <Card.Body className="newsCardContainerBody">
             {loading ? <LoadingSpinner /> : error ? <MessageAlert variant='danger'>{error}</MessageAlert> :
             <>
             <Row xs={1} md={1}>
            {articles.map((article) => (
                        <Col className='pb-3'>
                            <NewsArticleCard article={article}/>
                        </Col>                        
                            ))}
        </Row>
             </>
        
        }   
        </Card.Body>
       
        </Card>
    )
}

export default NewsArticleContainer;