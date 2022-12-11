import { Container, Card, Row, Col } from "react-bootstrap";
import MessageAlert from "../../../widgets/MessageAlert/MessageAlert";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import StockPriceChart from "../../../stockVisualisationComponents/ChartTypes/PriceChart/PriceChart";

function GamePortfolio({ data, name, totalValue }) {

    var lineColor;
    var gradientColor;
    var positiveSymbol;

    function redOrGreen() {
        if (parseFloat(absoluteChange) > 0) {
            lineColor = "#00C49F"
            gradientColor = "#b5e8df"
            positiveSymbol = "+"
        }
        else {
            lineColor = "#d61e1e"
            gradientColor = "#ffc9c9"
        }
        return lineColor
    }


    const absoluteChange = data[0].value - data[1].value
    const percentageChange = ((data[0].value - data[1].value)/ data[1].value) * 100

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
                                        <dt style={{ color: redOrGreen() }}> {positiveSymbol}{parseFloat(absoluteChange).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} ({positiveSymbol}{percentageChange.toFixed(2)}%)</dt>
                                    </dl>
                                    <StockPriceChart data={data} lineColor={lineColor} gradientColor={gradientColor} dataKey={"value"} />
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