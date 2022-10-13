import {
    AreaChart,
    Legend,
    Area,
    XAxis,
    YAxis,
    Label,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

import { Container, Button, Card, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";

function StockPriceChart() {

    const [data, setData] = useState();

    const month = [
        { name: 'month', price: 100 },
        { name: 'month', price: 500 },
        { name: 'month', price: 60 },
        { name: 'month', price: 700 },
        { name: 'month', price: 800 }]

    const day = [
        { name: 'day', price: 400 },
        { name: 'day', price: 700 },
        { name: 'day', price: 60 },
        { name: 'day', price: 700 },
        { name: 'day', price: 500 }]


    const year = [
        { name: '2017', price: 400 },
        { name: '2018', price: 10 },
        { name: '2019', price: 60 },
        { name: '2020', price: 700 },
        { name: '2021', price: 100 }]


    const DayData = event => {
        // toggle shown data
        setData(day);
    };
    const MonthData = event => {
        // toggle shown data
        setData(month);
    };
    const YearData = event => {
        // toggle shown data
        setData(year);
    };

    useEffect(() => {
        //set data as daily data on loading card
        setData(day);
    }, [
        // day
    ]);

    return (
        <>
            <Card className="infoCardStyle">
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
                                    stroke="false">
                                        <Label value="Price $" position="left" angle="-90"></Label>
                                </YAxis>
                                <Area type="monotone" dataKey="price" stroke="#00C49F" fillOpacity={1} fill="url(#colorPrice)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Row>
                    <Row
                        style={{
                            justifyContent: "center"
                        }}>
                        <Col style={{
                            display: "flex",
                            justifyContent: "center"
                        }}>
                            <span className = "m-1">Filter By: </span>
                            <Button className="btn btn-primary btn-sm m-1" onClick={DayData}>Day</Button>

                            <Button className="btn btn-primary btn-sm m-1" onClick={MonthData}>Month</Button>

                            <Button className="btn btn-primary btn-sm m-1" onClick={YearData}>Year</Button>
                        </Col>
                    </Row>
                </Container>
            </Card>
        </>
    )
};


export default StockPriceChart;