import { Container, Button, Card, Row, Col, Dropdown,  Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";

function PortfolioOverallViz() {

    const [data, setData] = useState();

    const portfolioA = { valueHistory:[
        { date: '01-10', value: 400 },
        { date: '01-11', value: 700 },
        { date: '01-12', value: 60 },
        { date: '01-13', value: 700 },
        { date: '01-14', value: 500 },
        { date: '01-15', value: 400 },
        { date: '01-16', value: 700 },
        { date: '01-17', value: 60 },
        { date: '01-18', value: 1000 },
        { date: '01-19', value: 500 },
        { date: '01-20', value: 400 },
        { date: '01-21', value: 700 },
        { date: '01-22', value: 60 },
        { date: '01-23', value: 700 },
        { date: '01-24', value: 500 }
    ]}

    const portfolioB = [
        { date: '01-10', value: 400 },
        { date: '01-11', value: 700 },
        { date: '01-12', value: 60 },
        { date: '01-13', value: 200 },
        { date: '01-14', value: 500 },
        { date: '01-15', value: 10 },
        { date: '01-16', value: 700 },
        { date: '01-17', value: 60 },
        { date: '01-18', value: 700 },
        { date: '01-19', value: 500 },
        { date: '01-20', value: 400 },
        { date: '01-21', value: 700 },
        { date: '01-22', value: 60 },
        { date: '01-23', value: 700 },
        { date: '01-24', value: 300 },
    ]

    const portfolioC = [
        { date: '01-10', value: 100 },
        { date: '01-11', value: 200 },
        { date: '01-12', value: 60 },
        { date: '01-13', value: 300 },
        { date: '01-14', value: 500 },
        { date: '01-15', value: 10 },
        { date: '01-16', value: 700 },
        { date: '01-17', value: 60 },
        { date: '01-18', value: 700 },
        { date: '01-19', value: 800 },
        { date: '01-20', value: 100 },
        { date: '01-21', value: 200 },
        { date: '01-22', value: 630 },
        { date: '01-23', value: 900 },
        { date: '01-24', value: 100 },
    ]

    const portfolioList = ["portfolioA", "portfolioB", "portfolioC"]

    const handleSelect = (e) => {
        setData(portfolioA)
        console.log(e.target.value)  
    } 

    return (
        <>
            <Card style={{ border: "none", marginBottom: "1.25rem" }}>
                <Container>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm">
                            Select Portfolio
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {portfolioList.map(portfolioName => (
                                <Dropdown.Item as="button" value={portfolioName} onClick={handleSelect}>{portfolioName}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Row>
                        <ResponsiveContainer width="100%" height={400} margin={100}>
                            <LineChart width="100%" height={250} data={data}

                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: -25,
                                    bottom: 0
                                }}>

                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="value" stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Row>
                </Container>
            </Card>
        </>
    )
}

export default PortfolioOverallViz;