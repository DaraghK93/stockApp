import { Container } from "react-bootstrap";
import PortfolioOverallViz from "../../components/portfolioComponents/portfolioOverallViz/PortfolioOverallViz";

function PortfolioPage() {
    return (
        <Container>
            <h1>Portfolio Page</h1>
            <PortfolioOverallViz />
            <h2>My Balances</h2>
            <h2>Transaction History</h2>
        </Container>
    )
}

export default PortfolioPage;