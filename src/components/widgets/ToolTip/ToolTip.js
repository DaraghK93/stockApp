import { Container } from "react-bootstrap"
import moment from "moment";
const CustomToolTip = props => {
    const { active, payload, label } = props;
    if (!active || !payload) {
        return null;
    }
    return (
        <div className="toolTipStyle">
            <Container>
                <p>
                    Date: {moment(label).format('MMM Do YYYY')}
                </p>
                {payload.map((item, i) => (
                    <p key={i}>
                        Value: ${parseFloat(item.value).toFixed(2)}
                    </p>
                ))}
            </Container>
        </div>
    );
};

export default CustomToolTip;