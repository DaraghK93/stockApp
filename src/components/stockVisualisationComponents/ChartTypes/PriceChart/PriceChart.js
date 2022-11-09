import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip
} from "recharts";

import { Container, Button, Card, Row, Col } from "react-bootstrap";
import { useState, useEffect }  from "react";

//TODO style tooltip
// button underline then completely lined?


function StockPriceChart({ stock, lineColor, gradientColor }) {

    const [tickBoolean, setTickBoolean] = useState(false)

    const day = [
        { date: '01-10', price: 400 },
        { date: '01-11', price: 700 },
        { date: '01-12', price: 60 },
        { date: '01-13', price: 700 },
        { date: '01-01', price: 500 }]

    // data coming directly from the stock object provided above. This means that another request is not needed
    const oneWeekPrices = stock.week
    const oneMonthPrices = stock.month
    const oneYearPrices = stock.year
    
    // Move this up with the rest of the constants when we have the daily data. For now it cant be called before the dummy data is initialized
    const [data, setData] = useState(day); 

    const DayData = event => {
        // toggle shown data
        setData(day);
    };
    const WeekData = event => {
        // toggle shown data
        setData(oneWeekPrices);
    };
    const MonthData = event => {
        // toggle shown data
        setData(oneMonthPrices);
    };
    const YearData = event => {
        // toggle shown data
        setData(oneYearPrices);
    }

    window.addEventListener("resize", showTick);

    function showTick() {
        if (window.innerWidth >= 576) {
            setTickBoolean(true)
        }
        else {
            setTickBoolean(false)
        } 
    }

    useEffect(()=>{
        showTick()
    }, [])


    return (
        <>
            <Card
                style={{ border: "none", marginBottom: "1.25rem" }}>
                <Container>

                    <Row>

                            <ResponsiveContainer width="100%" height={400} margin={100}>
                                <AreaChart width="100%" height={250} data={data}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: -25,
                                        bottom: 0
                                    }}>
                                    <defs>
                                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={gradientColor} stopOpacity={0.8} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false}></CartesianGrid>
                                    <Tooltip />
                                
                                    <XAxis dataKey="date"
                                        stroke="#595959"
                                        tick={tickBoolean}
                                    >
                                    </XAxis>
                                    <YAxis unit='$'
                                        width={80} 
                                        stroke="#595959"/>
                                    <Area type="monotone" dataKey="price" stroke={lineColor} strokeWidth={2} fillOpacity={1} fill="url(#colorPrice)" />
                                </AreaChart>
                            </ResponsiveContainer>
                    </Row>
                    <Row
                        style={{
                            justifyContent: "center"
                        }}>
                        <Col className="centeredCol">
                            <Button className="btn btn-outline-info btn-sm m-1" onClick={DayData}>1D</Button>
                        </Col>
                        <Col className="centeredCol">
                        <Button className="btn btn-outline-info btn-sm m-1" onClick={WeekData}>1W</Button>
                        </Col>
                        <Col className="centeredCol">
                        <Button className="btn btn-outline-info btn-sm m-1" onClick={MonthData}>1M</Button>

                        </Col>
                        <Col className="centeredCol">
                        <Button className="btn btn-outline-info btn-sm m-1" onClick={YearData}>1Y</Button>
                        </Col>
                    </Row>
                </Container>
            </Card>
        </>
    )
};


export default StockPriceChart;