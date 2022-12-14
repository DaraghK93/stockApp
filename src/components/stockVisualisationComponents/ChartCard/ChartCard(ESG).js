import { Container, Card } from "react-bootstrap";
import EnvironmentalRating from "../ESGRatingSliders/EnvironmentalRating";
import SocialRating from "../ESGRatingSliders/SocialRating"
import GovernanceRating from "../ESGRatingSliders/GovernanceRating";
import InfoButtonModal from "../../widgets/InfoButtonModal/InfoButtonModal";

const ChartCardESG = ({ title, edata, sdata, gdata }) => {
    return (
        <>
            <Card className="infoCardStyle">
                <Container>
                    <h2>{title} <InfoButtonModal title="What Is an ESG Rating?" info={
                        <div>
                            <h4>What does an ESG rating mean?</h4>
                            <span>A good ESG rating means a company is managing its environment, social, and governance risks well relative to its peers. A poor ESG rating is the opposite -
                                - the company has relatively higher unmanaged exposure to ESG risks. Read more about ESG ratings <a className="linkStyle"
                                href="https://www.fool.com/investing/stock-market/types-of-stocks/esg-investing/esg-rating/" target="_blank" rel="noopener noreferrer">here</a>.</span>
                        </div>} />
                    </h2>
                    <h4>Environmental<InfoButtonModal title="Environmental Rating" 
                    info={<div>
                        <span>Environmental issues include can include factors such as Carbon emissions, Climate change vulnerability, Water sourcing, 
                        Biodiversity & land use, Toxic emissions & waste, Packaging material & waste, and Electronic waste. Read more about Environment scores <a 
                        className="linkStyle" href="https://www.gobyinc.com/esg-scores-why-they-matter/" target="_blank" rel="noopener noreferrer">here</a>.</span></div>} /></h4>
                    <EnvironmentalRating erating={edata} />
                    <h4>Social<InfoButtonModal title="Social Rating" info=
                    {<div><span>
                            Social scores include issues such as: Labor management, Worker safety training, Supply chain labor standards, 
                            Product safety & quality, and Consumer financial protection. Read more about social scores <a
                             className="linkStyle" href="https://www.gobyinc.com/esg-scores-why-they-matter/" target="_blank" rel="noopener noreferrer">here</a>.</span></div>} /></h4>
                    <SocialRating srating={sdata} />
                    <h4>Governance<InfoButtonModal title="Governance Rating" info={<div><span>
                       Governance issues can include: Composition of the board in terms of diversity & independence, Executive compensation, 
                       Accounting practices, Business ethic, and Tax transparency. Read more about Governance scores <a 
                       className="linkStyle" href="https://www.gobyinc.com/esg-scores-why-they-matter/" target="_blank" rel="noopener noreferrer">here</a>.</span></div>} /></h4>
                    <GovernanceRating grating={gdata} />
                </Container>
            </Card>
        </>
    )
}
export default ChartCardESG;

