import { Card, ListGroup, ListGroupItem, Container } from "react-bootstrap";
import SentimentBadge from "../../widgets/sentimentBadge/SentimentBadge";
import MyImage from "./sampleGraph2.PNG";

function PortfolioCard({ portfolioName }) {
    return (
        <Card>
            <ListGroup className="list-group-flush">
                <Container>
                    <h5 style={{ marginTop: "10px" }}>{ portfolioName }</h5>
                    <Card.Img
                        variant="top"
                        src={MyImage}
                        style={{
                            display: "block",
                            width: "100%",
                            margin: "auto"
                        }}
                    />
                </Container>
                <ListGroupItem>
                </ListGroupItem>
                <ListGroupItem>
                    <strong>Exchange: </strong><br></br>
                    <strong>Current value:</strong> $<br></br>
                    <strong>Change (24h):</strong> <span style={{
                        //  color: redOrGreen() 
                    }}>$ (%)</span>
                </ListGroupItem>
                <ListGroupItem>
                    <img src="https://stockappnewslogobucket.s3.eu-west-1.amazonaws.com/twitter_logo_blue.png" alt="twitter symbol"
                        style={{ width: "1.25rem" }} /> <strong>Twitter Sentiment: </strong><SentimentBadge sentiment='Positive' />
                    <br></br>
                    <img src="https://cdn-icons-png.flaticon.com/512/1042/1042782.png" alt="news symbol"
                        style={{ width: "1.25rem" }} /> <strong>News Sentiment: </strong><SentimentBadge sentiment='Negative' />
                </ListGroupItem>
            </ListGroup>



        </Card >
    )
}
export default PortfolioCard;