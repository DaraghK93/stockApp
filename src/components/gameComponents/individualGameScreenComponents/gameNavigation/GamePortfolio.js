import { Container, Card, Row, Col } from "react-bootstrap";
import PortfolioGraph from "../../../portfolioComponents/portfolioGraph/portfoliograph";

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
                                <p>No value history yet! Come back tomorrow to see your portfolio's growth or decline!</p>
                            }
                        </Col>
                    </Row>
                </Container>
            </Card>
        </>
    )
}

export default GamePortfolio;