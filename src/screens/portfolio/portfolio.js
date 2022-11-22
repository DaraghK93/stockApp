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
                { longname: "Microsoft Inc.", symbol: 'MSFT', logo: "https://blogs.microsoft.com/wp-content/uploads/prod/2012/08/8867.Microsoft_5F00_Logo_2D00_for_2D00_screen.jpg", value: 500, currentprice: 100, sector: "Healthcare", quantity: 5 },
                { longname: "Amazon", symbol: 'AMZN', logo: "https://1000logos.net/wp-content/uploads/2016/10/Amazon-logo-meaning.jpg", value: 80, currentprice: 40, sector: "Healthcare", quantity: 2 },
                { longname: "Apple Inc", symbol: 'AAPL', logo: "https://cdn.mos.cms.futurecdn.net/6bTF6C2QiWXvhi33fJi3AC.jpg", value: 30, currentprice: 10, sector: "Science", quantity: 3 },
                { longname: "Johnson and Johnson", symbol: 'JNJ', logo: "https://1000logos.net/wp-content/uploads/2020/04/Logo-Johnson-Johnson.jpg", value: 20, currentprice: 20, sector: "Pharmacy", quantity: 1 },
                { longname: "Viatris Inc.", symbol: 'VTRS', logo: "https://irishbusinessfocus.ie/wp-content/uploads/2020/11/Viatris-1.jpg", value: 100, currentprice: 20, sector: "Genocide", quantity: 5 },
                { longname: "Trimble Inc.", symbol: 'TRMB', logo: "https://cdn.cookielaw.org/logos/c885c24a-94ee-4211-9f8a-34755125ad52/34e16f3f-7e18-4206-9622-88302d880149/320c76fa-5756-4998-a4e0-dd9cc43c92bf/trimble_logo.png", value: 80, currentprice: 40, sector: "Business", quantity: 2 },
                { longname: "Baker Hughes Company", symbol: 'BKR', logo: "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/n1ftivyzkrvizrn1jlbe", value: 30, currentprice: 10, sector: "Science", quantity: 3 },
                { longname: "DISH Network Corperation", symbol: 'DISH', logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Dish_Network_logo_2012.svg/1200px-Dish_Network_logo_2012.svg.png", value: 20, currentprice: 20, sector: "Farming", quantity: 1 },
                { longname: "Marathon Oil Corperation", symbol: 'MRO', logo: "https://mma.prnewswire.com/media/710626/Marathon_Oil_Corporation_Logo.jpg?p=facebook", value: 100, currentprice: 20, sector: "Heresy", quantity: 5 },
                { longname: "Match group Inc", symbol: 'MTCH', logo: "https://mma.prnewswire.com/media/378794/Match_Group_Logo.jpg?p=facebook", value: 30, currentprice: 10, sector: "Science", quantity: 3 },
                { longname: "The Boeing Company", symbol: 'BA', logo: "https://logos-world.net/wp-content/uploads/2021/08/Boeing-Logo.png", value: 30, currentprice: 20, sector: "Pharmacy", quantity: 1 },
                { longname: "Coterra Energy Inc", symbol: 'CTRA', logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Coterra_Energy%2C_Inc._Logo.png", value: 100, currentprice: 20, sector: "Religion", quantity: 5 },
                { longname: "Schlumberger Limited", symbol: 'SLB', logo: "https://www.newrest.eu/wp-content/uploads/2015/12/Logo-Schlumberger.jpg", value: 80, currentprice: 40, sector: "Drinking", quantity: 2 },
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
                { longname: "Microsoft Inc.", symbol: 'MSFT', logo: "https://blogs.microsoft.com/wp-content/uploads/prod/2012/08/8867.Microsoft_5F00_Logo_2D00_for_2D00_screen.jpg", value: 500, currentprice: 100, sector: "Healthcare", quantity: 5 },
                { longname: "Amazon", symbol: 'AMZN', logo: "https://1000logos.net/wp-content/uploads/2016/10/Amazon-logo-meaning.jpg", value: 80, currentprice: 40, sector: "Healthcare", quantity: 2 },
                { longname: "Apple Inc", symbol: 'AAPL', logo: "https://cdn.mos.cms.futurecdn.net/6bTF6C2QiWXvhi33fJi3AC.jpg", value: 30, currentprice: 10, sector: "Science", quantity: 3 },
                { longname: "Johnson and Johnson", symbol: 'JNJ', logo: "https://1000logos.net/wp-content/uploads/2020/04/Logo-Johnson-Johnson.jpg", value: 20, currentprice: 20, sector: "Pharmacy", quantity: 1 },
                { longname: "Viatris Inc.", symbol: 'VTRS', logo: "https://irishbusinessfocus.ie/wp-content/uploads/2020/11/Viatris-1.jpg", value: 100, currentprice: 20, sector: "Genocide", quantity: 5 },
                { longname: "Trimble Inc.", symbol: 'TRMB', logo: "https://cdn.cookielaw.org/logos/c885c24a-94ee-4211-9f8a-34755125ad52/34e16f3f-7e18-4206-9622-88302d880149/320c76fa-5756-4998-a4e0-dd9cc43c92bf/trimble_logo.png", value: 80, currentprice: 40, sector: "Business", quantity: 2 },

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
                { longname: "Microsoft Inc.", symbol: 'MSFT', logo: "https://blogs.microsoft.com/wp-content/uploads/prod/2012/08/8867.Microsoft_5F00_Logo_2D00_for_2D00_screen.jpg", value: 500, currentprice: 100, sector: "Healthcare", quantity: 5 },
                { longname: "Amazon", symbol: 'AMZN', logo: "https://1000logos.net/wp-content/uploads/2016/10/Amazon-logo-meaning.jpg", value: 80, currentprice: 40, sector: "Healthcare", quantity: 2 },
                { longname: "Apple Inc", symbol: 'AAPL', logo: "https://cdn.mos.cms.futurecdn.net/6bTF6C2QiWXvhi33fJi3AC.jpg", value: 30, currentprice: 10, sector: "Science", quantity: 3 },
                { longname: "Johnson and Johnson", symbol: 'JNJ', logo: "https://1000logos.net/wp-content/uploads/2020/04/Logo-Johnson-Johnson.jpg", value: 20, currentprice: 20, sector: "Pharmacy", quantity: 1 },
                { longname: "Viatris Inc.", symbol: 'VTRS', logo: "https://irishbusinessfocus.ie/wp-content/uploads/2020/11/Viatris-1.jpg", value: 100, currentprice: 20, sector: "Genocide", quantity: 5 },
                { longname: "Trimble Inc.", symbol: 'TRMB', logo: "https://cdn.cookielaw.org/logos/c885c24a-94ee-4211-9f8a-34755125ad52/34e16f3f-7e18-4206-9622-88302d880149/320c76fa-5756-4998-a4e0-dd9cc43c92bf/trimble_logo.png", value: 80, currentprice: 40, sector: "Business", quantity: 2 },

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