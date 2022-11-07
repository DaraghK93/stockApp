/// Description:
//  This component is used to display stocks to the user
//  It is a card which shows an overview of the stock showing some key details 

import { borderBottom } from '@mui/system';
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
      <Card className="h-100 tickercardstyle" style={{
        padding: "none"
      }}>

        <Container style={{ height: "100px", width: "150px" }}>
          <Card.Body style={{ textDecoration: 'none' }}>
            <Card.Img
              variant="top"
              src={stock.logo}
              style={{
                display: "block",
                margin: "auto"
              }}
            />
          </Card.Body>
        </Container>
        <ListGroup
          className="list-group-flush"
          style={{
            borderTop: "none",
            padding: "none",
            borderBottom: "none",
            border: "none"
          }}>
          <ListGroupItem
            style={{
              border: "none",
              borderBottom: "none",
              padding: "none",
              margin: "none"
            }}
          ><h5>
            <center>
              {stock.symbol}</center></h5>
              <span style={{ color: "grey", padding: "none", margin: "none", border: "none" }}><center>{stock.longname}</center></span>
          </ListGroupItem>

          <ListGroupItem ><center><span style={{ color: redOrGreen(), border:"none" }}>{postiveSymbol}${stock.daily_change.absoluteChange} ({postiveSymbol}{stock.daily_change.percentageChange}%)</span>
          </center>
          </ListGroupItem>


        </ListGroup>


        {/* <ListGroupItem ><strong>Current price:</strong> ${stock.daily_change.currentprice}<br></br>
            <strong>Change (24h):</strong> <span style={{ color: redOrGreen() }}>${stock.daily_change.absoluteChange} ({postiveSymbol}{stock.daily_change.percentageChange}%)</span>
          </ListGroupItem> */}
        {/* <ListGroupItem >
            <img src="https://stockappnewslogobucket.s3.eu-west-1.amazonaws.com/twitter_logo_blue.png" alt="twitter symbol"
              style={{ width: "1.25rem" }} /> <strong>Twitter Sentiment: </strong><SentimentBadge sentiment='Positive' />
            <br></br>
            <img src="https://cdn-icons-png.flaticon.com/512/1042/1042782.png" alt="news symbol"
              style={{ width: "1.25rem" }} /> <strong>News Sentiment: </strong><SentimentBadge sentiment='Negative' />
          </ListGroupItem> */}
        {/* </ListGroup> */}
      </Card>
    </Link>
  );
}

export default TickerCard;