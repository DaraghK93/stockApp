/// Description:
//  This component is used to display stocks to the user
//  It is a card which shows an overview of the stock showing some key details 
import { Card, ListGroupItem, ListGroup } from 'react-bootstrap';

import { Link } from "react-router-dom";

function TickerCard({ stock }) {

  var postiveSymbol;
  var absoluteChange;

  function redOrGreen() {
    absoluteChange = parseFloat(stock.daily_change.absoluteChange).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    if (parseFloat(stock.daily_change.percentageChange) >= 0) {
      postiveSymbol = "+"
      return "green"
    }
    else {
      return "red"
    }
  }

  return (
    <Link to={`/stock/${stock.symbol}`} style={{ textDecoration: 'none'}}>
      <Card className="h-100 tickercardstyle" style={{ margin: 'auto'}}>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{
            width: "7rem",
            height: "6rem",
          }}>
            <img src={stock.logo} style={{
              maxWidth: "100%",
              height: "100%",
              display: "block",
              objectFit: "contain",
              paddingTop: "5px",
              marginLeft: "auto",
              marginRight: "auto"

            }} alt="company logo"></img>
          </div>
        </div>
        <ListGroup className="list-group-flush" style={{ border: "none" }}>
          <ListGroupItem className="noBorder7REMHeight"><h5>
            <center>
              {stock.symbol}</center></h5>
            <span className="noBorderGreyText"><center>{stock.longname}</center></span>
          </ListGroupItem>
          <ListGroupItem><center><span className="noBorderFont90" style={{ color: redOrGreen() }}>
            {postiveSymbol}{absoluteChange} <strong>({postiveSymbol}{parseFloat(stock.daily_change.percentageChange).toFixed(2)}%)</strong></span>
          </center>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </Link>
  );
}

export default TickerCard;