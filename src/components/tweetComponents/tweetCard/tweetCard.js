/* Credit to Clever Programmer on Youtube for design ideas and code format https://www.youtube.com/watch?v=rJjaqSTzOxI */


import React from 'react';
import './tweetCard.css';
import SentimentBadge from '../../widgets/sentimentBadge/SentimentBadge';
import VerifiedIcon from '@mui/icons-material/Verified';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Avatar } from '@mui/material';

const HASHTAG_FORMATTER = (string) => {
  return string
    .split(/((?:^|\s)(?:#[a-z\d-]+))/gi)
    .map((v, i) => {
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

function TweetCard({ tweet }) {
  return (
    <div className='tweet'>
      <div className='tweet_avatar'>
        <Avatar src={tweet.imageUrl} />
      </div>
      <div className='tweet_body'>
        <div className='tweet_header'>
          <div className='tweet_headerText'>
            <h3>
              {tweet.displayname}{' '}
              <span className='tweet_headerSpecial'>
                {(tweet.isVerified === 'true') && <VerifiedIcon className='tweet_badge' />} @
                {tweet.username}
              </span>
              <>
                {' '}
              </>
            </h3>
            <SentimentBadge sentiment={tweet.sentiment} />
          </div>
          <div className='tweet_headerDescription'>
            <p>{HASHTAG_FORMATTER(tweet.content)}</p>
          </div>
        </div>
        <div className='tweet_footer'>
          <div className='like_count'>
            <FavoriteIcon fontSize='small' />
            <>{tweet.likeCount}</>
          </div>
          <div className='tweet_date'>
            <>{tweet.date.substring(0, 24)}</>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TweetCard;

