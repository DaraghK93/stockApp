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
import { useState, useEffect, PureComponent } from "react";
import LoadingSpinner from "../../../widgets/LoadingSpinner/LoadingSpinner";
import MessageAlert from "../../../widgets/MessageAlert/MessageAlert";

/// API ///
import { APIName } from "../../../../constants/APIConstants";
import { API } from "aws-amplify";

function StockPriceChart({ symbol }) {

    const [loading, setLoading] = useState(true);
    const [oneMonthPrices, setOneMonthPrices] = useState();
    const [oneYearPrices, setOneYearPrices] = useState();
    const [error, setError] = useState("");
    const [tickBoolean, setTickBoolean] = useState(false);

    function showTick() {
        if (window.innerWidth >= 576) {
            setTickBoolean(true)
        }
        else {
            setTickBoolean(false)
        } 
    }

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
                let path2 = `/api/stock/OneMonthStockData/${symbol}`
                const res2 = await API.get(APIName, path2);
                setOneYearPrices(res);
                setOneMonthPrices(res2);
                setLoading(false);
                showTick();
            } catch (error) {
                // Log the error 
                console.log(error);
                // Set the error message to be displayed on the page 
                setError(error.response.data.errormessage);
                setLoading(false);
            }
        }
        getOneMonthPrices();
    }, [symbol])

    const day = [
        { date: '01-10', price: 400 },
        { date: '01-11', price: 700 },
        { date: '01-12', price: 60 },
        { date: '01-13', price: 700 },
        { date: '01-01', price: 500 }]

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
        setData(oneYearPrices);
    };

    const [data, setData] = useState(day);

    return (
        <>
            <Card
                style={{ border: "none", paddingBottom: "20px", marginBottom: "20px" }}
            >
                <Container>
                    <Row
                        style={{
                            justifyContent: "center"
                        }}>
                        <Col className="centeredCol">
                            <Button variant="light" className="btn btn-light btn-sm m-1" onClick={DayData}>1D</Button>
                        </Col>
                        <Col className="centeredCol">
                            <Button variant="light" className="btn btn-light btn-sm m-1" onClick={DayData}>1W</Button>

                        </Col>
                        <Col className="centeredCol">
                            <Button variant="light" className="btn btn-light btn-sm m-1" onClick={MonthData}>1M</Button>

                        </Col>
                        <Col className="centeredCol">
                            <Button variant="light" className="btn btn-light btn-sm m-1" onClick={YearData}>1Y</Button>
                        </Col>
                    </Row>
                    <Row>
                        {loading ? <LoadingSpinner /> : error ? <MessageAlert variant='danger'>{error}</MessageAlert> :
                            <ResponsiveContainer width="100%" height={400} margin={100}>
                                <AreaChart width="100%" height={250} data={data}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: -35,
                                        bottom: 0
                                    }}>
                                    <defs>
                                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#b5e8df" stopOpacity={0.8} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false}></CartesianGrid>
                                    <Tooltip />
                                    <XAxis dataKey="date"
                                        stroke="black"
                                        tick={tickBoolean}
                                    >
                                    </XAxis>
                                    <YAxis unit='$'
                                        width={80} />
                                    <Area type="monotone" dataKey="price" stroke="#00C49F" fillOpacity={1} fill="url(#colorPrice)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        }
                    </Row>
                </Container>
            </Card>
        </>
    )
};


export default StockPriceChart;