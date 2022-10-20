/* Credit to Clever Programmer on Youtube for design ideas and code format https://www.youtube.com/watch?v=rJjaqSTzOxI */

import React from 'react';
import SentimentBadge from '../../widgets/sentimentBadge/SentimentBadge';
import VerifiedIcon from '@mui/icons-material/Verified';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Avatar } from '@mui/material';
import { Col, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HASHTAG_FORMATTER = (string) => {
  return string.split(/((?:^|\s)(?:#[a-z\d-]+))/gi).map((v, i) => {
    if (v.includes('#')) {
      return (
        <span key={i} className='hashtag'>
          {v}
        </span>
      );
    } else {
      return <span key={i}>{v}</span>;
    }
  });
};

const CREATE_LINK = (string) => {
  let link = `https://twitter.com/daiIymaja/status/${string}`;
  return link;
};

function TweetCard({ tweet }) {
  return (
    <>
      <Container className='tweet'>
        {' '}
        <a href={CREATE_LINK(tweet.id)} target='blank'>
          <Row className='tweet_header'>
            <Col className='tweet_avatar col-2'>
              <Avatar src={tweet.imageUrl} />
            </Col>
            <Col className='tweet_headerText'>
              <h3>
                {tweet.displayname}{' '}
                <span className='tweet_headerSpecial'>
                  {tweet.isVerified === 'true' && <VerifiedIcon className='tweet_badge' />}{' '}
                  @{tweet.username}
                </span>
              </h3>
              <SentimentBadge sentiment={tweet.sentiment} />
            </Col>
          </Row>

          <Row>
            <div className='tweet_headerDescription'>
              <p>{HASHTAG_FORMATTER(tweet.content)}</p>
            </div>
          </Row>

          <Row className='tweet_footer'>
            <Col className='col-sm'>
              <div className='like_count'>
                <FavoriteIcon fontSize='small' />
                {tweet.likeCount}
              </div>
            </Col>
            <Col className='col-sm' align='right'>
              <div className='tweet_date'>{tweet.date.substring(0, 24)}</div>
            </Col>
          </Row>
        </a>
      </Container>
    </>
  );
}

export default TweetCard;
