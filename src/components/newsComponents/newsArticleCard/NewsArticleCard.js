import {Card,ListGroup} from 'react-bootstrap'

import SentimentBadge from '../../widgets/sentimentBadge/SentimentBadge';
import moment from "moment";


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
            style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}
            className=''
          >
             <Card.Title
                className='newsArticleCardTitle'
            >{article.headline}</Card.Title>
            <ListGroup className="list-group-flush">
                <ListGroup.Item> <SentimentBadge sentiment={article.sentiment}/></ListGroup.Item>
                <ListGroup.Item><Card.Text className='newsArticleCardSourceandDate'>
                {article.source} • {moment(article.pubDate).format('ddd MMM Do YY')}
            </Card.Text></ListGroup.Item>
            </ListGroup>
          </Card.Body>


          
        </Card>

    )
}

export default NewsArticleCard;


//        <Card className="">
//<Card.Img 
//            className='col-md-4'
//            variant="top" 
//            src={article.image}/>
//        
//          <Card.Body
//            className=''
//          >
//             <Card.Title
//                className='newsArticleCardTitle'
//            >{article.headline}</Card.Title>
//            <SentimentBadge sentiment={article.sentiment}/>
//            <Card.Text
//                className='newsArticleCardSourceandDate'
//            >
//                {article.source} • {article.pubDate}
//            </Card.Text>
//          </Card.Body>
//        </Card>
