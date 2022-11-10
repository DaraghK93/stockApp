import { Container } from "react-bootstrap";
import PortfolioOverallViz from "../../components/portfolioComponents/portfolioOverallViz/PortfolioOverallViz";
import HoldingsCard from "../../components/portfolioComponents/HoldingsCard/HoldingsCard"

function PortfolioPage() {
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

    const holdings = [
        { name: 'MSFT', value: 5 },
        { name: 'AMZN', value: 6 },
        { name: 'CHAD', value: 3 },
        { name: 'YUP', value: 4 },
    ];

    return (
        <Container>
            <PortfolioOverallViz portfolios={portfolios} />
            <HoldingsCard data={holdings}/>
            <h2>My Balances</h2>
            <h2>Transaction History</h2>
        </Container>
    )
}

export default PortfolioPage;