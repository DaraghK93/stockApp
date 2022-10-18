/// Stock Discovery Screen ///
// Route:
//  <URL>/stockdiscovery
// Description:
//  This screen contains the components rendered to the user when they click "Explore stocks"

import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import LoadingSpinner from '../../components/widgets/LoadingSpinner/LoadingSpinner';
import MessageAlert from '../../components/widgets/MessageAlert/MessageAlert';
import { TwitterTweetEmbed } from 'react-twitter-embed';

/// API ///
import { APIName } from '../../constants/APIConstants';
import { API } from 'aws-amplify';

function TwitterFeed() {
  const [loading, setLoading] = useState(true);
  const [tweets, setTweet] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    /// getTweets ///
    // Description:
    //  Makes a GET request to the backend route /tweet/
    const getTweets = async () => {
      try {
        // Request is being sent set loading true
        setLoading(true);
        // Set the path
        let path = '/api/tweet';
        // Send the request with API package
        const res = await API.get(APIName, path);
        // Set the state for the tweets and loading to false
        setTweet(res);
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
  }, []);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <MessageAlert variant='danger'>{error}</MessageAlert>
      ) : (
        <Container>
          <h1>Twitter Feed</h1>
          <br />
          <h2>All Tweets</h2>
          <Row>
            {tweets.map((tweetObject) => (
              <Col className='py-2' key={tweetObject.id}>
                <TwitterTweetEmbed tweetId={tweetObject.id} />
                Sentiment = {tweetObject.sentiment}
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
}
export default TwitterFeed;
