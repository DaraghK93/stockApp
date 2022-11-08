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
      <Card className="h-100 tickercardstyle" style={{
        padding: "none"
      }}>
        <Container style={{ height: "5.625rem", width: "7rem" }}>
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
        <ListGroup className="list-group-flush" style={{ border: "none" }}>
          <ListGroupItem
            style={{ border: "none", height: "7rem" }}><h5>
              <center>
                {stock.symbol}</center></h5>
            <span style={{ color: "grey", border: "none" }}><center>{stock.longname}</center></span>
          </ListGroupItem>
          <ListGroupItem><center><span style={{ color: redOrGreen(), border: "none", fontSize:"90%" }}>
            {postiveSymbol}{absoluteChange} ({postiveSymbol}{parseFloat(stock.daily_change.percentageChange).toFixed(2)}%)</span>
          </center>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </Link>
  );
}

export default TickerCard;