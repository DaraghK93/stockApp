import { Container, Button, Card, Row, Col, Dropdown } from "react-bootstrap";
import { useState, useEffect } from "react";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";

function PortfolioOverallViz() {
    const data = [
        { date: '01-10', price: 400 },
        { date: '01-11', price: 700 },
        { date: '01-12', price: 60 },
        { date: '01-13', price: 700 },
        { date: '01-14', price: 500 },
        { date: '01-15', price: 400 },
        { date: '01-16', price: 700 },
        { date: '01-17', price: 60 },
        { date: '01-18', price: 700 },
        { date: '01-19', price: 500 },
        { date: '01-20', price: 400 },
        { date: '01-21', price: 700 },
        { date: '01-22', price: 60 },
        { date: '01-23', price: 700 },
        { date: '01-24', price: 500 },
    ]


    // useEffect(()=>{
    //     showTick()
    // }, [])

    // window.addEventListener("resize", showTick);

    // function showTick() {
    //     if (window.innerWidth >= 576) {
    //         setTickBoolean(true)
    //     }
    //     else {
    //         setTickBoolean(false)
    //     } 
    // }

    return (
        <>
        <Card style={{ border: "none", marginBottom: "1.25rem" }}>
        <Container>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm">
                    Portfolio A
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item>Portfolio A</Dropdown.Item>
                    <Dropdown.Item>Portfolio B</Dropdown.Item>
                    <Dropdown.Item>Portfolio C</Dropdown.Item>
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
                        <Line type="monotone" dataKey="price" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </Row>
            </Container>
            </Card>
        </>
    )
}

export default PortfolioOverallViz;