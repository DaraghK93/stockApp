import { Container, Card, Row, Col } from "react-bootstrap";
import PortfolioGraph from "../../../portfolioComponents/portfolioGraph/portfoliograph";
import MessageAlert from "../../../widgets/MessageAlert/MessageAlert";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

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

                        </dl>
                    </Row>
                    <Row>
                        <Col style={{ paddingLeft: 0 }}>
                            {data.length > 1 ?

                                <>
                                    <dl className='infoList' style={{ padding: 0 }}>
                                        <dt style={{ color: "#00C49F" }}>+$CHANGE (+CHANGE%)</dt>
                                    </dl>
                                    <PortfolioGraph data={data}></PortfolioGraph>
                                </> :
                                <MessageAlert variant="info">No value history yet for this
                                    portfolio! Come back tomorrow and see your portfolio value change <TrendingUpIcon></TrendingUpIcon></MessageAlert>
                            }
                        </Col>
                    </Row>
                </Container>
            </Card>
        </>
    )
}

export default GamePortfolio;