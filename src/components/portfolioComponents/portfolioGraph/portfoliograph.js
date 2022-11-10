import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from "recharts";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap"

function PortfolioGraph({ data }) {
    const [tickBoolean, setTickBoolean] = useState(false)

    window.addEventListener("resize", showTick);

    function showTick() {
        if (window.innerWidth >= 576) {
            setTickBoolean(true)
        }
        else {
            setTickBoolean(false)
        }
    }
    useEffect(() => {
        showTick()
    }, [])


    const CustomToolTip = props => {
        const { active, payload, label } = props;
        if (!active || !payload) {
            return null;
        }
        return (
            <div className="toolTipStyle">
                <Container>
                    <p>
                        Date: {label}
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

    return (
        <ResponsiveContainer width="100%" height={400} margin={100}>
            <LineChart width="100%" height={250} data={data}

                margin={{
                    top: 10,
                    right: 30,
                    left: -25,
                    bottom: 0
                }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false}></CartesianGrid>
                <XAxis dataKey="date" tick={tickBoolean} />
                <YAxis unit='$'
                    width={80}
                    stroke="#595959" />
                <Line type="monotone" dataKey="value" stroke="#00C49F" strokeWidth={2} />
                <Tooltip
                    content={<CustomToolTip />}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default PortfolioGraph;