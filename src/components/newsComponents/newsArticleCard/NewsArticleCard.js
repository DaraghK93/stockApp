import {Card,ListGroup,Modal,Image} from 'react-bootstrap'
import SentimentBadge from '../../widgets/sentimentBadge/SentimentBadge';
import moment from "moment";
import {useState} from 'react';


/// NewsArticleCard ///
// Description:
//  Holds an idividual news article
//  Passed to it is a news article prop 
function NewsArticleCard({article}){
    /// showInfo - Used to show the news article information modal 
    const [showInfo, setShowInfo] = useState(false);
    return(
        <>
        <Card onClick={() => setShowInfo(true)} className="newsArticleCard">
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
                <ListGroup.Item> <SentimentBadge sentiment={article.sentiment}/></ListGroup.Item>
                <ListGroup.Item>
                    <Card.Text className='newsArticleCardSourceandDate'>
                    {article.source} • {moment(article.pubDate).format('ddd MMM Do YY')}
                </Card.Text>
            </ListGroup.Item>
           
          </Card.Body>     
        </Card>
        <Modal
            size="lg"
            show={showInfo}
            onHide={() => setShowInfo(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title>{article.headline}</Modal.Title>
            </Modal.Header>
            <Image className="newsArticleCardModalImage" thumbnail={false} src={article.image}/>
            <Modal.Body>
                <SentimentBadge customStyle={{fontSize:"0.80rem"}} sentiment={article.sentiment}/>
                <p className='newsArticleCardModalInfoText'>
                {article.category} •  {article.source} • {moment(article.pubDate).format('ddd MMM Do YY')}
                </p>
                <p>{article.description}</p>
                <p>Access the full article <a className="linkStyle" href={article.link} target="_blank" rel="noreferrer">here</a></p>
            </Modal.Body>
        </Modal>
        </>
        

    )
} 
//</ListGroup>
//<ListGroup style={{"align":"right"}} className="list-group-flush align-items-right">
export default NewsArticleCard;