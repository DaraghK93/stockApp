/// Description:
//  This component is used to display stocks to the user
//  It is a card which shows an overview of the stock showing some key details 

import { Card, ListGroupItem, ListGroup, Row, Col } from 'react-bootstrap';

import { Link } from "react-router-dom";


function TickerCard({ stock }) {

  function redOrGreen() {
    if (parseFloat(stock.daily_change.percentageChange) >= 0) {
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
          > {stock.symbol} | {stock.exchange}</span></Col> </Row>


          </ListGroupItem>
        </ListGroup>


        <Card.Body style={{ textDecoration: 'none' }}>
          <Row style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>

            <Col style={{
              display: "flex", justifyContent: "center",
              alignItems: "center"
            }}>


              <Card.Img
                // variant="middle"  
                src={stock.logo}
                // style={{
                //   display: "flex",
                //   justifyContent: "center",
                //   alignItems: "center"

                // }}
              />

            </Col>
          </Row>


        </Card.Body>

        <ListGroup className="list-group-flush">
          <ListGroupItem><strong>Current price:</strong> ${stock.daily_change.currentprice}<br></br>
            <strong>Change (24h)</strong> <span style={{ color: redOrGreen() }}>{stock.daily_change.absoluteChange} ({stock.daily_change.percentageChange})</span>

          </ListGroupItem>
          <ListGroupItem>Twitter Sentiment:
            <br></br>
            News Sentiment:
          </ListGroupItem>
          <ListGroupItem><strong>Did you know?</strong> <br></br>This company was voted least evil by Donald Trump!</ListGroupItem>
        </ListGroup>
      </Card>
    </Link>
  );
}


export default TickerCard;

// "https://stockappnewslogobucket.s3.eu-west-1.amazonaws.com/twitter_logo_blue.png"