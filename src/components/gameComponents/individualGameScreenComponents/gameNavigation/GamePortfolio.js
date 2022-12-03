import { Container, Card, Row, Col } from "react-bootstrap";
import PortfolioGraph from "../../../portfolioComponents/portfolioGraph/portfoliograph";
import MessageAlert from "../../../widgets/MessageAlert/MessageAlert";

function GamePortfolio({ data, name, totalValue }) {
    return (
        <>
            <Card className="priceChartStyle">
                <Container>
                    <Row>
                        <dl className='infoList' style={{ padding: 0 }}>
                            <dt>
                                <h1>{String(name)}</h1>
                            </dt>
                            <dt style={{ fontSize: "150%" }}>{parseFloat(totalValue).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</dt>
                            <dt style={{ color: "#00C49F" }}>+$CHANGE (+CHANGE%)</dt>
                        </dl>
                    </Row>
                    <Row>
                        <Col style={{ paddingLeft: 0 }}>
                            {data.length > 0 ? <PortfolioGraph data={data}></PortfolioGraph> :
                                <MessageAlert variant="info">No value history yet for this portfolio! Buy a stock and come back tomorrow to see your portfolio's growth or decline!</MessageAlert>
                            }
                        </Col>
                    </Row>
                </Container>
            </Card>
        </>
    )
}

export default GamePortfolio;