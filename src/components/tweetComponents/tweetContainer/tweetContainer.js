/* Reusing Warrens container class since they are side by side on screen */

import { Row, Col, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import LoadingSpinner from '../../widgets/LoadingSpinner/LoadingSpinner';
import MessageAlert from '../../widgets/MessageAlert/MessageAlert';
import TweetCard from '../tweetCard/tweetCard';

/// API ///
import { APIName } from '../../../constants/APIConstants';
import { API } from 'aws-amplify';

function TweetContainer({ stock }) {
  const [loading, setLoading] = useState(true);
  const [tweets, setTweets] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    /// getStockInfo ///
    // Description:
    //  Makes a GET request to the backend route /tweet/:symbol
    const getTweets = async () => {
      try {
        // Request is being sent set loading true
        setLoading(true);
        // get the symbol from the url string, use regex to extract capital letters only
        const symbol = window.location.href.replace(/[^A-Z]/g, '');
        // Set the path and use symbol to get single stock
        let path = `/api/tweet/${symbol}`;
        // Send the request with API package
        const res = await API.get(APIName, path);
        // Set the state for the stock and loading to false
        setTweets(res.tweet);
        setLoading(false);
      } catch (error) {
        // Log the error
        console.log(error);
        // Set the error message to be displayed on the page
        setError(error.response.data.errormessage);
        setLoading(false);
      }
    };
    getTweets();
  }, [stock]);

  return (
    <Card id='newsCardContainer' className='newsCardContainer'>
      <Row className='twitter_header'>
        <Col>
          <h2 className='newsCardContainerHeading'>Twitter Feed</h2>
        </Col>
        <Col className='twitter_image'>
          <img
            src='https://stockappnewslogobucket.s3.eu-west-1.amazonaws.com/twitter_logo_blue.png'
            alt=''
          ></img>
        </Col>
      </Row>
      <Card.Body className='newsCardContainerBody'>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <MessageAlert variant='danger'>{error}</MessageAlert>
        ) : (
          <>
            <Row xs={1} md={1}>
              {tweets.map((tweet) => (
                <Col key={`${tweet.id}`} className='pb-3'>
                  <TweetCard tweet={tweet}></TweetCard>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default TweetContainer;
