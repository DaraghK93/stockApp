/// Description:
//  This component is used to display stocks to the user
//  It is a card which shows an overview of the stock showing some key details 

import { Card, ListGroupItem, ListGroup, Container } from 'react-bootstrap';

import { Link } from "react-router-dom";
import SentimentBadge from '../../widgets/sentimentBadge/SentimentBadge';

function TickerCard({ stock }) {

  var postiveSymbol;

  function redOrGreen() {
    if (parseFloat(stock.daily_change.percentageChange) >= 0) {
      postiveSymbol = "+"
      return "green"
    }
    else {
      return "red"
    }
  }


  return (
    <Link to={`/stock/${stock.symbol}`} style={{ textDecoration: 'none' }}>
      <Card className="h-100 tickercardstyle" >
        <ListGroup className="list-group-flush"
          style={{
            height: "5rem",
            whiteSpace: "initial"
          }}
        >
          <ListGroupItem>
            <h5 style={{ float: "left" }}>{stock.longname}</h5>
          </ListGroupItem>
        </ListGroup>
        <Container style={{ height: "11.25rem" }}>
          <Card.Body style={{ textDecoration: 'none' }}>
            <Card.Img
              variant="top"
              src={stock.logo}
              style={{
                display: "block",
                width: "60%",
                margin:"auto"
              }}
            />
          </Card.Body>
        </Container>
        <ListGroup className="list-group-flush">
          <ListGroupItem>

            {stock.symbol} | {stock.exchange}

          </ListGroupItem>
          <ListGroupItem><strong>Current price:</strong> ${stock.daily_change.currentprice}<br></br>
            <strong>Change (24h):</strong> <span style={{ color: redOrGreen() }}>${stock.daily_change.absoluteChange} ({postiveSymbol}{stock.daily_change.percentageChange}%)</span>
          </ListGroupItem>
          <ListGroupItem>
            <img src="https://stockappnewslogobucket.s3.eu-west-1.amazonaws.com/twitter_logo_blue.png" alt="twitter symbol"
              style={{ width: "1.25rem" }} /> <strong>Twitter Sentiment: </strong><SentimentBadge sentiment='Positive' />
            <br></br>
            <img src="https://cdn-icons-png.flaticon.com/512/1042/1042782.png" alt="news symbol"
              style={{ width: "1.25rem" }} /> <strong>News Sentiment: </strong><SentimentBadge sentiment='Negative' />
          </ListGroupItem>
        </ListGroup>
      </Card>
    </Link>
  );
}

export default TickerCard;