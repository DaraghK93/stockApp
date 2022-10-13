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

/// API ///
import { APIName } from "../../../../constants/APIConstants";
import { API } from "aws-amplify";

function StockPriceChart({ symbol }) {

    const [loading, setLoading] = useState(true);
    const [oneMonthPrices, setOneMonthPrices] = useState();
    const [error, setError] = useState("");


    useEffect(() => {
        /// getStockInfo ///
        // Description:
        //  Makes a GET request to the backend route /stock/OneYearStockData/:symbol
        const getOneMonthPrices = async () => {
            try {
                // Request is being sent set loading true 
                setLoading(true);
                // Set the path and use symbol to get single stock
                let path = `/api/stock/OneYearStockData/${symbol}`
                // Send the request with API package
                const res = await API.get(APIName, path);

                Object.keys(res).forEach(function(el){
                    res[el] = parseFloat(res[el])
                  });
                setOneMonthPrices(res);
                setLoading(false);
            } catch (error) {
                // Log the error 
                console.log(error);
                // Set the error message to be displayed on the page 
                setError(error.response.data.errormessage);
                setLoading(false);
            }
        }
        getOneMonthPrices();
    }, [])

    const month = [
        { name: 'month', price: 100 },
        { name: 'month', price: 500 },
        { name: 'month', price: 60 },
        { name: 'month', price: 700 },
        { name: 'month', price: 800 }]

    const day = [
        { name: '2022-01-10', price: 400 },
        { name: '2022-01-11', price: 700 },
        { name: '2022-01-12', price: 60 },
        { name: '2022-01-13', price: 700 },
        { name: '2022-01-1', price: 500 }]

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
        setData(oneMonthPrices);
    };
    const YearData = event => {
        // toggle shown data
        setData(year);
    };

    const [data, setData] = useState(day);
    //  const [data, setData] = useState();

    return (
        <>
            <Card className="infoCardStyle">
                <Container>
                    <h2>Price Chart</h2>
                    <Row>
                        <ResponsiveContainer width="100%" height={400} margin={100}>
                            <AreaChart width="100%" height={250} data={data}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: -25,
                                    bottom: 30
                                }}>
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
                                <YAxis />
                                {/* dataKey="price"
                                    stroke="false">
                                    <Label value="Price $" position="left" angle="-90"></Label>
                                </YAxis> */}
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
                            <span className="m-1">Filter By: </span>
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