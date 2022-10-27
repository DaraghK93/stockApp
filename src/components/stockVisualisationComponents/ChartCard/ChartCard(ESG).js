import { Container, Dropdown, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import EnvironmentalRating from "../ESGRatingSliders/EnvironmentalRating";
import SocialRating from "../ESGRatingSliders/SocialRating"
import GovernanceRating from "../ESGRatingSliders/GovernanceRating";

import InfoButtonModal from "../../widgets/InfoButtonModal/InfoButtonModal";

const ChartCardESG = ({ title, edata, sdata, gdata }) => {

    const [isShownBarChart, setIsShownBarChart] = useState(false);

    useEffect(() => {
        if (title) {
            if (String(title) === "ESG Rating") {
                setIsShownBarChart(true);
            }
        }
    }, [title]); // <-- empty dependancies array


    return (
        <>
            <Card className="infoCardStyle">
                <Container>
                    <h2>{title}</h2>
                    <h3>Environmental<InfoButtonModal /></h3>
                    <EnvironmentalRating erating={edata} />
                    <h3>Social<InfoButtonModal /></h3>
                    <SocialRating srating={sdata} />
                    <h3>Governance<InfoButtonModal /></h3>
                    <GovernanceRating grating={gdata} />
                </Container>
            </Card>
        </>
    )
}
export default ChartCardESG;