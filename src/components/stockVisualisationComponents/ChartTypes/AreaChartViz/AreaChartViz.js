import {
    AreaChart,
    Legend,
    Area,
    XAxis,
    YAxis,
    Label,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import { Container, Button, Card, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";

function StockPriceChart() {

    const [data, setData] = useState();

    const month = [
        { name: 'month', price: 400, price2: 100 },
        { name: 'month', price: 500, price2: 300 },
        { name: 'month', price: 60, price2: 500 },
        { name: 'month', price: 700, price2: 200 },
        { name: 'month', price: 800, price2: 900 }]

    const day = [
        { name: 'day', price: 400, price2: 100 },
        { name: 'day', price: 500, price2: 300 },
        { name: 'day', price: 60, price2: 500 },
        { name: 'day', price: 700, price2: 200 },
        { name: 'day', price: 800, price2: 900 }]


    const year = [
        { name: 'YEAR 1', price: 400, price2: 100 },
        { name: 'YEAR 2', price: 500, price2: 300 },
        { name: 'YEAR 3', price: 60, price2: 500 },
        { name: 'year', price: 700, price2: 200 },
        { name: 'year', price: 800, price2: 900 }]




        const DayData = event => {
            // toggle shown state
            setData(day);
        };
        const MonthData = event => {
            // toggle shown state
            setData(month);
        };
        const YearData = event => {
            // toggle shown state
            setData(year);
        };
    



    return (
        <>
            <Card style={{ padding: "10px", margin: "10px", marginBottom: "20px", paddingBottom: "50px" }}>
                <Container>
                    <h2>Price Chart</h2>
                    <Row>
                        <ResponsiveContainer width="100%" height={400} margin={100}>
                            <AreaChart width={730} height={250} data={data}
                                margin={{ top: 10, right: 30, left: 20, bottom: 30 }}>
                                <defs>
                                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00C49F" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#00C49F" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <Legend verticalAlign="top" height={36}
                                />
                                <CartesianGrid strokeDasharray="3 3" vertical={false}></CartesianGrid>
                                <XAxis dataKey="name"
                                    stroke="black"
                                >
                                    <Label value="Date" position="bottom"
                                    /></XAxis>
                                <YAxis dataKey="price"
                                    stroke="false"
                                />
                                {/* <Tooltip /> */}
                                <Area type="monotone" dataKey="price" stroke="#00C49F" fillOpacity={1} fill="url(#colorPrice)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Row>
                    <Row>
                        <span>Filter By: </span>
                    </Row>
                    <Row style={{ display: "flex", justifyContent: "center" }}>
                        <Col xs={3}>
                            <Button className="btn btn-primary btn-sm" onClick={DayData}>Day</Button>
                        </Col>
                        <Col xs={3}>
                            <Button className="btn btn-primary btn-sm" onClick={MonthData}>Month</Button>
                        </Col>
                        <Col xs={3}>
                            <Button className="btn btn-primary btn-sm" onClick={YearData}>Year</Button>
                        </Col>
                    </Row>
                </Container>
            </Card>
        </>
    )
};


export default StockPriceChart;