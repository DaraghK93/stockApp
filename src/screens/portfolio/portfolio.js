import { Container } from "react-bootstrap";
import PortfolioOverallViz from "../../components/portfolioComponents/portfolioOverallViz/PortfolioOverallViz";
import HoldingsCard from "../../components/portfolioComponents/HoldingsCard/HoldingsCard"
import { useState } from "react"

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
            ], holdings: [
                { stock: { symbol: 'MSFT', logo: "https://blogs.microsoft.com/wp-content/uploads/prod/2012/08/8867.Microsoft_5F00_Logo_2D00_for_2D00_screen.jpg", daily_change: { currentprice: 20 } }, quantity: 5 },
                { stock: { symbol: 'AMZN', logo: "https://1000logos.net/wp-content/uploads/2016/10/Amazon-logo-meaning.jpg", daily_change: { currentprice: 40 } }, quantity: 2 },
                { stock: { symbol: 'AAPL', logo: "https://cdn.mos.cms.futurecdn.net/6bTF6C2QiWXvhi33fJi3AC.jpg", daily_change: { currentprice: 10 } }, quantity: 3 },
                { stock: { symbol: 'JNJ', logo: "https://1000logos.net/wp-content/uploads/2020/04/Logo-Johnson-Johnson.jpg", daily_change: { currentprice: 20 } }, quantity: 1 },
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
            ], holdings: [
                { stock: { symbol: 'MSFT', logo: "https://blogs.microsoft.com/wp-content/uploads/prod/2012/08/8867.Microsoft_5F00_Logo_2D00_for_2D00_screen.jpg", daily_change: { currentprice: 20 } }, quantity: 7 },
                { stock: { symbol: 'AMZN', logo: "https://1000logos.net/wp-content/uploads/2016/10/Amazon-logo-meaning.jpg", daily_change: { currentprice: 40 } }, quantity: 1 },
                { stock: { symbol: 'AAPL', logo: "https://cdn.mos.cms.futurecdn.net/6bTF6C2QiWXvhi33fJi3AC.jpg", daily_change: { currentprice: 10 } }, quantity: 2 },
                { stock: { symbol: 'JNJ', logo: "https://1000logos.net/wp-content/uploads/2020/04/Logo-Johnson-Johnson.jpg", daily_change: { currentprice: 20 } }, quantity: 8 },
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
            ], holdings: [
                { stock: { symbol: 'MSFT', logo: "https://blogs.microsoft.com/wp-content/uploads/prod/2012/08/8867.Microsoft_5F00_Logo_2D00_for_2D00_screen.jpg", daily_change: { currentprice: 20 } }, quantity: 5 },
                { stock: { symbol: 'AMZN', logo: "https://1000logos.net/wp-content/uploads/2016/10/Amazon-logo-meaning.jpg", daily_change: { currentprice: 40 } }, quantity: 3 },
                { stock: { symbol: 'AAPL', logo: "https://cdn.mos.cms.futurecdn.net/6bTF6C2QiWXvhi33fJi3AC.jpg", daily_change: { currentprice: 10 } }, quantity: 4 },
                { stock: { symbol: 'JNJ', logo: "https://1000logos.net/wp-content/uploads/2020/04/Logo-Johnson-Johnson.jpg", daily_change: { currentprice: 20 } }, quantity: 5 },
            ]
        }
    ]

    const [holdings, setHoldings] = useState(portfolios[0].holdings)

    return (
        <Container>
            <PortfolioOverallViz portfolios={portfolios} setHoldings={setHoldings} />
            <HoldingsCard data={holdings} />
            <h2>Transaction History</h2>
        </Container>
    )
}

export default PortfolioPage;