/// Description:
//  This component is used to display stocks to the user
//  It is a card which shows an overview of the stock showing some key details 

import { Card, ListGroupItem, ListGroup, Row, Col } from 'react-bootstrap';

import { Link } from "react-router-dom";
import SentimentBadge from '../../widgets/sentimentBadge/SentimentBadge';
import InfoButtonHover from "../../widgets/InfoButtonHover/InfoButtonHover"


function TickerCard({ stock }) {

  var postiveSymbol;

  function redOrGreen() {
    if (parseFloat(stock.daily_change.percentageChange) >= 0) {
      postiveSymbol= "+"
      return "green"
    }
    else {
      return "red"
    }
  }

  return (
    <Link to={`/stock/${stock.symbol}`} style={{ textDecoration: 'none' }}>

      <Card className="h-100">
        <ListGroup className="list-group-flush">
          <ListGroupItem><Row xs={2}><Col
            xs={6}
          ><h5>{stock.longname}</h5></Col><Col style={{ paddingRight: 0 }}
            xs={5}
          ><span
            style={{ float: "right" }}
          > {stock.symbol} | {stock.exchange}</span></Col></Row>
          </ListGroupItem>
        </ListGroup>
        <Card.Body style={{ textDecoration: 'none' }}>
              <Card.Img
                variant="top"  
                src={stock.logo} />
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem><strong>Current price:</strong> ${stock.daily_change.currentprice}<br></br>
            <strong>Change (24h)</strong> <span style={{ color: redOrGreen() }}>${stock.daily_change.absoluteChange} ({postiveSymbol}{stock.daily_change.percentageChange})</span>
          </ListGroupItem>
          <ListGroupItem>
            <img src="https://stockappnewslogobucket.s3.eu-west-1.amazonaws.com/twitter_logo_blue.png" alt="twitter symbol"
            style={{width:"1.25rem"}}/> <strong>Twitter Sentiment: </strong><SentimentBadge sentiment='Positive'/>
            <br></br>
            <img src= "https://cdn-icons-png.flaticon.com/512/1042/1042782.png" alt="news symbol"
            style={{width:"1.25rem"}}/> <strong>News Sentiment: </strong><SentimentBadge sentiment='Negative'/>
          </ListGroupItem>
          <ListGroupItem><strong>Did you know?<InfoButtonHover info="There's no information here!" setPlacement="right"></InfoButtonHover></strong>
          <br></br>This company was voted least evil by Donald Trump!</ListGroupItem>
        </ListGroup>
      </Card>
    </Link>
  );
}

export default TickerCard;