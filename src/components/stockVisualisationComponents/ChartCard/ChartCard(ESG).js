import { Container, Dropdown, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import EnvironmentalRating from "../ESGRatingSliders/EnvironmentalRating";

import InfoButtonModal from "../../widgets/InfoButtonModal/InfoButtonModal";

const ChartCardESG = ({ title, data }) => {

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
                    <h2>{title}<InfoButtonModal /></h2>
                    <EnvironmentalRating erating={data} />
                    
                    
                </Container>
            </Card>
        </>
    )
}
export default ChartCardESG;