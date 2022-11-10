import { Container, Card, Row, Col, Dropdown } from "react-bootstrap";
import { useState } from "react";
import PortfolioGraph from "../portfolioGraph/portfoliograph";

function PortfolioOverallViz() {
    const portfolios = [
        {
            name: "PortfolioA", valueHistory: [
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
        },
        {
            name: "PortfolioB", valueHistory: [
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
        },
        {
            name: "PortfolioC", valueHistory: [
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
        }
    ]

    const [data, setData] = useState(portfolios[0].valueHistory);
    const [portfolioName, setPortfolioName] = useState(portfolios[0].name)

    const handleSelect = (e) => {
        portfolios.forEach(function (portfolio) {
            if (e.target.id === portfolio.name) {
                setData(portfolio.valueHistory)
                setPortfolioName(portfolio.name)
            }
        })
    }

    return (
        <>
            <Card className="priceChartStyle">
                <Container>
                    <Row>
                        <Col className="col col-xs-auto col-md-2">
                            <dl className='infoList'>
                                <dt>
                                    <h1>{portfolioName}</h1>
                                </dt>
                                <dt style={{ fontSize: "150%" }}>$200</dt>
                                <dt style={{ color: "#00C49F" }}>+$50 (+25%)</dt>
                            </dl>
                        </Col>
                        <Col className="col col-xs-2 col-md-8">
                            <Dropdown className="dropdownStyle">
                                <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm">
                                    Select Portfolio
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {portfolios.map(portfolio => (
                                        <Dropdown.Item
                                            value={portfolio.name}
                                            id={portfolio.name}
                                            key={portfolio.name}
                                            onClick={handleSelect}>{portfolio.name}</Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                    <Row>
                        <PortfolioGraph data={data}></PortfolioGraph>
                    </Row>
                </Container>
            </Card>
        </>
    )
}

export default PortfolioOverallViz;