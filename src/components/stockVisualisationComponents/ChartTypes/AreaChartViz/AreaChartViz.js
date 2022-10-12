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

function StockPriceChart() {

    // get real prices APPL
    const data = [
        { name: '01', price: 400, price2: 100 },
        { name: '02', price: 500, price2: 300 },
        { name: '03', price: 60, price2: 500 },
        { name: '04', price: 700, price2: 200 },
        { name: '05', price: 800, price2: 900 },
        { name: '06', price: 200, price2: 100 },
        { name: '07', price: 1000, price2: 150 },
        { name: '08', price: 1100, price2: 800 },
        { name: '09', price: 400, price2: 100 },
        { name: '10', price: 500, price2: 300 },
        { name: '11', price: 60, price2: 500 },
        { name: '12', price: 700, price2: 200 },
        { name: '13', price: 800, price2: 900 },
        { name: '14', price: 200, price2: 100 },
        { name: '15', price: 1000, price2: 150 },
        { name: '16', price: 1100, price2: 800 },
        { name: '17', price: 400, price2: 100 },
        { name: '18', price: 500, price2: 300 },
        { name: '19', price: 60, price2: 500 },
        { name: '20', price: 700, price2: 200 },
        { name: '21', price: 800, price2: 900 },
        { name: '22', price: 200, price2: 100 },
        { name: '23', price: 1000, price2: 150 },
        { name: '24', price: 1100, price2: 800 },
        { name: '25', price: 700, price2: 200 },
        { name: '26', price: 800, price2: 900 },
        { name: '27', price: 200, price2: 100 },
        { name: '28', price: 1000, price2: 150 },
        { name: '29', price: 1100, price2: 800 },
        { name: '30', price: 1100, price2: 800 }
    ]


    return (
        <>
            <Card style={{ padding: "10px", margin:"10px", marginBottom:"20px", paddingBottom:"50px"  }}>
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
                    <Row style={{display:"flex", justifyContent:"center"}}>
                        <Col xs={3}>
                            <Button className="btn btn-primary btn-sm">Day</Button>
                        </Col>
                        <Col xs={3}>
                            <Button className="btn btn-primary btn-sm">Month</Button>
                        </Col>
                        <Col xs={3}>
                            <Button className="btn btn-primary btn-sm">Year</Button>
                        </Col>
                    </Row>
                </Container>
            </Card>
        </>
    )
};


export default StockPriceChart;