/// Description:
//  This component is used to display stocks to the user
//  It is a card which shows an overview of the stock showing some key details 

import { autoShowTooltip } from 'aws-amplify';
import { Button, Card, ListGroupItem, ListGroup, Badge } from 'react-bootstrap';
import { Camera, ChevronsUp, ArrowUp, ArrowDown } from 'react-feather';

function TickerCard({ stock }) {

  function redOrGreen() {
    if (parseInt(stock.changepercent) >= 0) {
      console.log(stock.changepercent);
      return "green"
    }
    else {
      console.log(typeof stock.changepercent);
      return "red"
    }
  }

  return (
    <Card style={{ width: '15rem' }}>
      <Card.Body>
        <Card.Img variant="top" 
        src={stock.logo}
        // style={{ height: '5rem', width: '100%'}} 
        />

        <Card.Title style={{ fontSize: 30 }}> <strong>{stock.longname}</strong></Card.Title>
        <Card.Text style={{ fontFamily: 'Courier New', fontSize: 50 }}>{stock.symbol}</Card.Text>

        <Button colour="$primary">View Stock</Button>

      </Card.Body>

      <ListGroup className="list-group-flush">
        <ListGroupItem><strong>Current price:</strong> ${stock.currentprice}</ListGroupItem>
        <ListGroupItem><strong>Absolute change:</strong> {stock.changeabs}</ListGroupItem>
        <ListGroupItem style={{ color: redOrGreen() } }><strong>Percent change: </strong>{stock.changepercent}</ListGroupItem>
        <ListGroupItem><strong>Sector:</strong> {stock.industry}</ListGroupItem>
        <ListGroupItem><strong>Exchange:</strong> {stock.exchange}</ListGroupItem>


      </ListGroup>


    </Card>
  );
}


export default TickerCard;