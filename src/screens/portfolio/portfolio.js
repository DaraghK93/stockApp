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
            ],
            remainder: 500,
            holdings: [
                { stock: { longname: "Microsoft Inc.", symbol: 'MSFT', logo: "https://blogs.microsoft.com/wp-content/uploads/prod/2012/08/8867.Microsoft_5F00_Logo_2D00_for_2D00_screen.jpg", daily_change: { currentprice: 20 }, sector: "Healthcare" }, quantity: 5 },
                { stock: { longname: "Amazon", symbol: 'AMZN', logo: "https://1000logos.net/wp-content/uploads/2016/10/Amazon-logo-meaning.jpg", daily_change: { currentprice: 40 }, sector: "Healthcare" }, quantity: 2 },
                { stock: { longname: "Apple Inc", symbol: 'AAPL', logo: "https://cdn.mos.cms.futurecdn.net/6bTF6C2QiWXvhi33fJi3AC.jpg", daily_change: { currentprice: 10 }, sector: "Science" }, quantity: 3 },
                { stock: { longname: "Johnson and Johnson", symbol: 'JNJ', logo: "https://1000logos.net/wp-content/uploads/2020/04/Logo-Johnson-Johnson.jpg", daily_change: { currentprice: 20 }, sector: "Pharmacy" }, quantity: 1 },
                { stock: { symbol: 'MSFT', logo: "https://blogs.microsoft.com/wp-content/uploads/prod/2012/08/8867.Microsoft_5F00_Logo_2D00_for_2D00_screen.jpg", daily_change: { currentprice: 20 }, sector: "Genocide" }, quantity: 5 },
                { stock: { symbol: 'AMZN', logo: "https://1000logos.net/wp-content/uploads/2016/10/Amazon-logo-meaning.jpg", daily_change: { currentprice: 40 }, sector: "Business" }, quantity: 2 },
                { stock: { symbol: 'AAPL', logo: "https://cdn.mos.cms.futurecdn.net/6bTF6C2QiWXvhi33fJi3AC.jpg", daily_change: { currentprice: 10 }, sector: "Science" }, quantity: 3 },
                { stock: { symbol: 'JNJ', logo: "https://1000logos.net/wp-content/uploads/2020/04/Logo-Johnson-Johnson.jpg", daily_change: { currentprice: 20 }, sector: "Farming" }, quantity: 1 },
                { stock: { symbol: 'MSFT', logo: "https://blogs.microsoft.com/wp-content/uploads/prod/2012/08/8867.Microsoft_5F00_Logo_2D00_for_2D00_screen.jpg", daily_change: { currentprice: 20 }, sector: "Heresy" }, quantity: 5 },
                { stock: { symbol: 'AMZN', logo: "https://1000logos.net/wp-content/uploads/2016/10/Amazon-logo-meaning.jpg", daily_change: { currentprice: 40 }, sector: "Wunderbar" }, quantity: 2 },
                { stock: { symbol: 'AAPL', logo: "https://cdn.mos.cms.futurecdn.net/6bTF6C2QiWXvhi33fJi3AC.jpg", daily_change: { currentprice: 10 }, sector: "Science" }, quantity: 3 },
                { stock: { symbol: 'JNJ', logo: "https://1000logos.net/wp-content/uploads/2020/04/Logo-Johnson-Johnson.jpg", daily_change: { currentprice: 20 }, sector: "Pharmacy" }, quantity: 1 },
                { stock: { symbol: 'MSFT', logo: "https://blogs.microsoft.com/wp-content/uploads/prod/2012/08/8867.Microsoft_5F00_Logo_2D00_for_2D00_screen.jpg", daily_change: { currentprice: 20 }, sector: "Religion" }, quantity: 5 },
                { stock: { symbol: 'AMZN', logo: "https://1000logos.net/wp-content/uploads/2016/10/Amazon-logo-meaning.jpg", daily_change: { currentprice: 40 }, sector: "Drinking" }, quantity: 2 },
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
            ],
            remainder: 200,
            holdings: [
                { stock: { longname: "Microsoft Inc.", symbol: 'MSFT', logo: "https://blogs.microsoft.com/wp-content/uploads/prod/2012/08/8867.Microsoft_5F00_Logo_2D00_for_2D00_screen.jpg", daily_change: { currentprice: 20 }, sector: "Healthcare" }, quantity: 7 },
                { stock: { longname: "Amazon", symbol: 'AMZN', logo: "https://1000logos.net/wp-content/uploads/2016/10/Amazon-logo-meaning.jpg", daily_change: { currentprice: 40 }, sector: "Science" }, quantity: 1 },
                { stock: { longname: "Apple Inc", symbol: 'AAPL', logo: "https://cdn.mos.cms.futurecdn.net/6bTF6C2QiWXvhi33fJi3AC.jpg", daily_change: { currentprice: 10 }, sector: "Pharmacy" }, quantity: 2 },
                { stock: { longname: "Johnson and Johnson", symbol: 'JNJ', logo: "https://1000logos.net/wp-content/uploads/2020/04/Logo-Johnson-Johnson.jpg", daily_change: { currentprice: 20 }, sector: "Healthcare" }, quantity: 8 },
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
            ], remainder: 100,
            holdings: [
                { stock: { symbol: 'MSFT', logo: "https://blogs.microsoft.com/wp-content/uploads/prod/2012/08/8867.Microsoft_5F00_Logo_2D00_for_2D00_screen.jpg", daily_change: { currentprice: 20 }, sector: "Healthcare" }, quantity: 5 },
                { stock: { symbol: 'AMZN', logo: "https://1000logos.net/wp-content/uploads/2016/10/Amazon-logo-meaning.jpg", daily_change: { currentprice: 40 }, sector: "Healthcare" }, quantity: 3 },
                { stock: { symbol: 'AAPL', logo: "https://cdn.mos.cms.futurecdn.net/6bTF6C2QiWXvhi33fJi3AC.jpg", daily_change: { currentprice: 10 }, sector: "Pharamcy" }, quantity: 4 },
                { stock: { symbol: 'JNJ', logo: "https://1000logos.net/wp-content/uploads/2020/04/Logo-Johnson-Johnson.jpg", daily_change: { currentprice: 20 }, sector: "Science" }, quantity: 5 },
            ]
        }
    ]

    const [holdings, setHoldings] = useState(portfolios[0].holdings)
    const [remainder, setRemainder] = useState(portfolios[0].remainder)

    return (
        <Container>
            <PortfolioOverallViz portfolios={portfolios} setHoldings={setHoldings} setRemainder={setRemainder} />
            <HoldingsCard data={holdings} remainder={remainder} />
            <h2>Transaction History</h2>
        </Container>
    )
}

export default PortfolioPage;