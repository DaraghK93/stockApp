import {Card} from 'react-bootstrap'

import SentimentBadge from '../../widgets/sentimentBadge/SentimentBadge';


/// NewsArticleCard ///
// Description:
//  Holds an idividual news article
//  Passed to it is a news article prop 
function NewsArticleCard({article}){
    return(
        <Card className="newsArticleCard">
        <Card.Img 
            className='newsArticleCardImage'
            variant="top" 
            src={article.image}/>
          <Card.Body
            className='newsArticleCardBody'
          >
             <Card.Title
                className='newsArticleCardTitle'
            >{article.headline}</Card.Title>
            <SentimentBadge sentiment={article.sentiment}/>
            <Card.Text
                className='newsArticleCardSourceandDate'
            >
                {article.source} • {article.pubDate}
            </Card.Text>
            <Card.Text
                className='newsArticleDescription'
            >
                {article.description} 
            </Card.Text>
          </Card.Body>
        </Card>
    )
}

export default NewsArticleCard;
