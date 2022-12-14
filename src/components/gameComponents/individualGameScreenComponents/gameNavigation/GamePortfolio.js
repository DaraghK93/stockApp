import { Container, Card, Row, Col } from "react-bootstrap";
import MessageAlert from "../../../widgets/MessageAlert/MessageAlert";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import StockPriceChart from "../../../stockVisualisationComponents/ChartTypes/PriceChart/PriceChart";

function GamePortfolio({ data, name, totalValue, final, finished, port, starting }) {

    function getFinal() {
        if (finished===true) {
        let result = final.find(item =>item._id === port)
        return result.totalValue
        } else {
            return null
        }
    }

    let finalValue = getFinal()

    function whichTotal() {
        let total
        if (finished) {
            total = finalValue
        } else {
            total = totalValue
        }
        return total
    }
    let total = whichTotal()


    var lineColor;
    var gradientColor;
    var positiveSymbol;
    var absoluteChange;
    var percentageChange

    function redOrGreen() {

        absoluteChange = total - starting
        percentageChange = (total - starting) / starting * 100
  
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

    return (
        <>
            <Card className="priceChartStyle">
                <Container>
                    <Row>
                        <dl className='infoList' style={{ padding: 0 }}>
                            <dt>
                                <h1>{String(name)}</h1>
                            </dt>
                            <dt style={{ fontSize: "150%" }}>{parseFloat(total).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</dt>
                            <dt style={{"color":"grey"}}>Current Portfolio Value</dt> 
                        </dl>
                    </Row>
                    <Row>
                        <Col style={{ paddingLeft: 0 }}>
                            {data.length === 0 ?

                                <MessageAlert variant="info">No value history yet for this
                                    portfolio! Come back tomorrow and see your portfolio value change <TrendingUpIcon></TrendingUpIcon></MessageAlert>
                                :
                                <>
                                    <dl className='infoList' style={{ padding: 0 }}>
                                        <dt style={{ color: redOrGreen() }}>{positiveSymbol}{parseFloat(absoluteChange).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} ({positiveSymbol}{percentageChange.toFixed(2)}%)</dt>
                                    </dl>
                                    <StockPriceChart data={data} lineColor={lineColor} gradientColor={gradientColor} dataKey={"value"} datetype={"port"} />
                                </>
                            }
                        </Col>
                    </Row>
                </Container>
            </Card>
        </>
    )
}

export default GamePortfolio;