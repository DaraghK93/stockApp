/// Description:
//  This component is used to display stocks to the user
//  It is a card which shows an overview of the stock showing some key details 

import { Card, ListGroupItem, ListGroup} from 'react-bootstrap';

import { Link } from "react-router-dom";


function TickerCard({ stock }) {

  function redOrGreen() {
    if (parseInt(stock.changepercent) >= 0) {
      return "green"
    }
    else {
      return "red"
    }
  }

  return (
    <Link to={`/stock/${stock.symbol}`} style={{ textDecoration: 'none'}}>
    <Card className="h-100">
      <Card.Body style={{ textDecoration: 'none'}}>
        <Card.Img variant="top"  src={stock.logo}
          style={{ width: "10rem", height: "15vw",
          margin: "20px",textDecoration: 'none'
        }}
        />
        <Card.Title style={{ fontSize: "3vh"  }}> <strong>{stock.longname}</strong></Card.Title>
        <Card.Text style={{ fontFamily: 'Courier New', fontSize: "2vh" }}>{stock.symbol}</Card.Text>

      </Card.Body>

      <ListGroup className="list-group-flush">
        <ListGroupItem><strong>Current price:</strong> ${stock.currentprice}</ListGroupItem>
        <ListGroupItem><strong>Absolute change:</strong> {stock.changeabs}</ListGroupItem>
        <ListGroupItem style={{ color: redOrGreen() } }><strong>Percent change: </strong>{stock.changepercent}</ListGroupItem>
        <ListGroupItem><strong>Sector:</strong> {stock.industry}</ListGroupItem>
        <ListGroupItem><strong>Exchange:</strong> {stock.exchange}</ListGroupItem>
      </ListGroup>
    </Card>
    </Link>
  );
}


export default TickerCard;