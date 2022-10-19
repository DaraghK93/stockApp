import {
    AreaChart,
    Legend,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

import { Container, Button, Card, Row, Col } from "react-bootstrap";
import { useState, useEffect, PureComponent } from "react";
import LoadingSpinner from "../../../widgets/LoadingSpinner/LoadingSpinner";
import MessageAlert from "../../../widgets/MessageAlert/MessageAlert";

/// API ///
import { APIName } from "../../../../constants/APIConstants";
import { API } from "aws-amplify";

class CustomizedAxisTick extends PureComponent {
    render() {
      const { x, y, payload } = this.props;
  
      return (
        <g transform={`translate(${x},${y})`}>
          <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
            {payload.value}
          </text>
        </g>
      );
    }
  }


function StockPriceChart({ symbol }) {

    const [loading, setLoading] = useState(true);
    const [oneMonthPrices, setOneMonthPrices] = useState();
    const [oneYearPrices, setOneYearPrices] = useState();
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
                let path2 = `/api/stock/OneMonthStockData/${symbol}`
                const res2 = await API.get(APIName, path2);
                setOneYearPrices(res);
                setOneMonthPrices(res2);
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
    }, [symbol])

    const day = [
        { date: '2022-01-10', price: 400 },
        { date: '2022-01-11', price: 700 },
        { date: '2022-01-12', price: 60 },
        { date: '2022-01-13', price: 700 },
        { date: '2022-01-1', price: 500 }]

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
    //  const [data, setData] = useState();

    return (
        <>
            <Card 

            className="infoCardStyle"

            style={{border:"none"}}
            >
                <Container>
                    {/* <h2>Price Chart</h2> */}
                    <Row>
                        {loading ? <LoadingSpinner /> : error ? <MessageAlert variant='danger'>{error}</MessageAlert> :
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
                                    {/* <Legend verticalAlign="top" height={36}
                                    /> */}
                                    <CartesianGrid strokeDasharray="3 3" vertical={false}></CartesianGrid>
                                    <XAxis dataKey="date"
                                        stroke="black"       
                                        tick={<CustomizedAxisTick />}       
                                        height={50}
                                    >
                                    </XAxis>
                                    <YAxis unit='$' 
                                    width={80}/>
                                    <Area type="monotone" dataKey="price" stroke="#00C49F" fillOpacity={1} fill="url(#colorPrice)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        }
                    </Row>
                    <Row
                        style={{
                            justifyContent: "center"
                        }}>
                        <Col style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop:"20px"
                        }}>
                            {/* <span className="m-1">Filter By: </span> */}
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