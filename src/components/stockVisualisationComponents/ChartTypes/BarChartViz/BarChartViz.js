import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
} from "recharts";

import { Container } from "react-bootstrap";

function BarChartViz({ data }) {

    return (
        <>
            <Container>
                <ResponsiveContainer width="100%" height={300} margin={100}>
                    <BarChart width={700} height={100} data={data}>
                        <XAxis dataKey="name" stroke="false" />
                        <YAxis dataKey="value" stroke="false" />      
                        <Bar dataKey="value" fill="#00C49F" label>
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </Container>
        </>
    )
};


export default BarChartViz;