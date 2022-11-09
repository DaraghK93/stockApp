import { Container, Button, Card, Row, Col, Dropdown, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";

function PortfolioOverallViz() {
    const [tickBoolean, setTickBoolean] = useState(false)

    const portfolioA = [
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
    ]

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

    const [data, setData] = useState(portfolioA);

    const handleSelect = (e) => {
        if (e.target.id === "portfolioA") {
            setData(portfolioA)
        }
        else if (e.target.id === "portfolioB") {
            setData(portfolioB)
        }
        else if (e.target.id === "portfolioC") {
            setData(portfolioC)
        }
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


    useEffect(() => {
        showTick()
    }, [])

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
                                <Dropdown.Item
                                    value={portfolioName}
                                    id={portfolioName}
                                    onClick={handleSelect}>{portfolioName}</Dropdown.Item>
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

                                <CartesianGrid strokeDasharray="3 3" vertical={false}></CartesianGrid>
                                <Tooltip />
                                <XAxis dataKey="date" tick={tickBoolean} />
                                <YAxis unit='$'
                                    width={80}
                                    stroke="#595959" />
                                <Tooltip />
                                <Line type="monotone" dataKey="value" stroke="#00C49F" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </Row>
                </Container>
            </Card>
        </>
    )
}

export default PortfolioOverallViz;