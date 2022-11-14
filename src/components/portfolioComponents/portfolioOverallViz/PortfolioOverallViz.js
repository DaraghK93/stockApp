import { Container, Card, Row, Col, Dropdown } from "react-bootstrap";
import { useState } from "react";
import PortfolioGraph from "../portfolioGraph/portfoliograph";

function PortfolioOverallViz({ portfolios, setHoldings }) {
    const [data, setData] = useState(portfolios[0].valueHistory);
    const [portfolioName, setPortfolioName] = useState(portfolios[0].name)

    const handleSelect = (e) => {
        portfolios.forEach(function (portfolio) {
            if (e.target.id === portfolio.name) {
                setData(portfolio.valueHistory)
                setPortfolioName(portfolio.name)
                setHoldings(portfolio.holdings)
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