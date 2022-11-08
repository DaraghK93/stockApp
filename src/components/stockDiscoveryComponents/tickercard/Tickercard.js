/// Description:
//  This component is used to display stocks to the user
//  It is a card which shows an overview of the stock showing some key details 
import { Card, ListGroupItem, ListGroup, Container } from 'react-bootstrap';

import { Link } from "react-router-dom";

function TickerCard({ stock }) {

  var postiveSymbol;
  var absoluteChange;

  function redOrGreen() {
    if (parseFloat(stock.daily_change.percentageChange) >= 0) {
      postiveSymbol = "+"
      absoluteChange = "$" + parseFloat(stock.daily_change.percentageChange).toFixed(2)
      return "green"
    }
    else {
      var myString = String(stock.daily_change.percentageChange)
      absoluteChange = myString.slice(0, 1) + "$" + myString.slice(1)
      return "red"
    }
  }

  return (
    <Link to={`/stock/${stock.symbol}`} style={{ textDecoration: 'none' }}>
      <Card className="h-100 tickercardstyle">
        <Container className="tickerCardImgContainer">
          <Card.Body style={{ textDecoration: 'none' }}>
            <Card.Img variant="top" src={stock.logo} />
          </Card.Body>
        </Container>
        <ListGroup className="list-group-flush" style={{border: "none"}}>
          <ListGroupItem className="noBorder7REMHeight"><h5>
              <center>
                {stock.symbol}</center></h5>
            <span className="noBorderGreyText"><center>{stock.longname}</center></span>
          </ListGroupItem>
          <ListGroupItem><center><span className="noBorderFont90"style={{ color: redOrGreen() }}>
            {postiveSymbol}{absoluteChange} ({postiveSymbol}{parseFloat(stock.daily_change.percentageChange).toFixed(2)}%)</span>
          </center>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </Link>
  );
}

export default TickerCard;