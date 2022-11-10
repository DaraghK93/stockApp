import { Container, Card, Row, Col, Dropdown } from "react-bootstrap";
import { useState } from "react";
import PortfolioGraph from "../portfolioGraph/portfoliograph";

function PortfolioOverallViz() {

    const [portfolioName, setPortfolioName] = useState("PortfolioA")

    // dummy data of portfolio history
    const PortfolioA = [
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
    const PortfolioB = [
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
    const PortfolioC = [
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
    // simulates a list of portfolio names attached to user. Basic logic in but will have to change with real data.
    const portfolioList = ["PortfolioA", "PortfolioB", "PortfolioC"]

    const [data, setData] = useState(PortfolioA);

    const handleSelect = (e) => {
        if (e.target.id === "PortfolioA") {
            setData(PortfolioA)
            setPortfolioName(e.target.id)
        }
        else if (e.target.id === "PortfolioB") {
            setData(PortfolioB)
            setPortfolioName(e.target.id)
        }
        else if (e.target.id === "PortfolioC") {
            setData(PortfolioC)
            setPortfolioName(e.target.id)
        }
    }



    return (
        <>
            <Card style={{ border: "none", marginBottom: "1.25rem" }}>
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
                                    {portfolioList.map(portfolioName => (
                                        <Dropdown.Item
                                            value={portfolioName}
                                            id={portfolioName}
                                            key={portfolioName}
                                            onClick={handleSelect}>{portfolioName}</Dropdown.Item>
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