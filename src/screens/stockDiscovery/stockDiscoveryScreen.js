import { Container, Card, Row, Col } from 'react-bootstrap';
import TickerCard from '../../components/stockDiscoveryComponents/TickerCard/tickerCard';
import StockSearchBar from '../../components/stockDiscoveryComponents/StockSearchBar/stockSearchBar';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

/// Stock Discovery Screen ///
// Route:
//  <URL>/explorestocks
// Description:
//  This screen contains the components rendered to the user when they click "Explore stocks"



function StockDiscoveryPage() {

    const stocks = [{
        name: "Microsoft Inc.",
        ticker: "MSFT",
        price: 10000,
        _id: 1
    }
        // ,
        // {
        //     name: "Company2",
        //     ticker: "CMPY",
        //     _id: 2
        // },
        // {
        //     name: "Company3",
        //     ticker: "EXMPL",
        //     _id: 3
        // },
        // {
        //     name: "Company4",
        //     ticker: "TCKR",
        //     _id: 4
        // },
        // {
        //     name: "Company5",
        //     ticker: "AMZN",
        //     _id: 5
        // }
    ]

    const [loading, setLoading] = useState(true);
    const [stock, setStock] = useState('');
    const [error, setError] = useState("");





    const getStocks = async () => {
        const result = await fetch(
            `http://localhost:3000/api/stock`,
        )
        const data = await result.json()

        console.log(data)

    }

    getStocks()



    return (
        <>
            <Container>
                <h1>Stock Discovery Page</h1>
                <h2> Search/ Filter stocks</h2>
                <StockSearchBar />
                <br />

                <h3>Insert Filter(s) Here</h3>

                <Card.Body>
                    <Card.Title><h2>All Stocks</h2></Card.Title>
                    {stocks.length > 0 ? (
                        <Row md={3} xs={1}>
                            {stocks.map((stockObj) => (
                                <Col className="py-2" key={stockObj._id}>
                                    <TickerCard stock={stockObj} />
                                </Col>
                            ))}
                        </Row>)
                        : <Card.Text>
                            Error Loading stocks
                        </Card.Text>}
                </Card.Body>
                <h2>Suggested Stocks</h2>
                <h2>Top Movers</h2>
                <h2>Compare Stocks</h2>

            </Container>
        </>
    )
}

export default StockDiscoveryPage;