/// Description:
//  This component is used to display stocks to the user
//  It is a card which shows an overview of the stock showing some key details 
import { Card, ListGroupItem, ListGroup, Container, Image } from 'react-bootstrap';

import { Link } from "react-router-dom";

function TickerCard({ stock }) {

  var postiveSymbol;
  var absoluteChange;

  function redOrGreen() {
    if (parseFloat(stock.daily_change.percentageChange) >= 0) {
      postiveSymbol = "+"
      absoluteChange = "$" + parseFloat(stock.daily_change.absoluteChange).toFixed(2)
      return "green"
    }
    else {
      var myString = String(stock.daily_change.absoluteChange)
      absoluteChange = myString.slice(0, 1) + "$" + myString.slice(1)
      return "red"
    }
  }

  /*
<div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            <div style={{
                                                width: "3.5rem",
                                                height: "1.5rem",
                                                height: "2rem",
                                            }}>
                                                <img src={item.logo} style={{
                                                    maxWidth: "100%",
                                                    height: "auto",
                                                    height: "100%",
                                                    display: "block",
                                                    objectFit: "contain"

                                                }} alt="company logo"></img>
                                            </div>
                                        </div>
*/

  return (
    <Link to={`/stock/${stock.symbol}`} style={{ textDecoration: 'none' }}>
      <Card className="h-100 tickercardstyle">

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            <div style={{
                                                width: "7rem",
                                                height: "6rem",
                                            }}>
                                                <img src={stock.logo} style={{
                                                    maxWidth: "100%",
                                                    height: "auto",
                                                    height: "100%",
                                                    display: "block",
                                                    objectFit: "contain",
                                                    paddingTop: "5px",
                                                    marginLeft: "auto",
                                                    marginRight:"auto"

                                                }} alt="company logo"></img>
                                            </div>
                                        </div>
        {/* <Container className="tickerCardImgContainer" style={{ margin: "none", paddingLeft: 0, paddingRight: 0, paddingTop: 0 }}>
          <Image src={stock.logo} style={{ objectFit: "contain" }} ></Image> */}
          {/* <Card.Body style={{ textDecoration: 'none' }}>
            <Card.Img variant="top" src={stock.logo} style={{ objectFit: "contain" }} />
          </Card.Body> */}
        {/* </Container> */}
        <ListGroup className="list-group-flush" style={{ border: "none" }}>
          <ListGroupItem className="noBorder7REMHeight"><h5>
            <center>
              {stock.symbol}</center></h5>
            <span className="noBorderGreyText"><center>{stock.longname}</center></span>
          </ListGroupItem>
          <ListGroupItem><center><span className="noBorderFont90" style={{ color: redOrGreen() }}>
            <strong>{postiveSymbol}{parseFloat(stock.daily_change.percentageChange).toFixed(2)}%</strong> ({postiveSymbol}{absoluteChange})</span>
          </center>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </Link>
  );
}

export default TickerCard;