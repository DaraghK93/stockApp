import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Cell
} from "recharts";

import { Container } from "react-bootstrap";

function BarChartViz({ data }) {

    const COLORS = [
        // '#0088FE', 
        '#32CD32', '#FF0000', '#FFBB28' ];

    return (
        <>
            <Container>
                <ResponsiveContainer width="100%" height={300} margin={100}>
                    <BarChart width={700} height={100} data={data}>
                        <XAxis dataKey="name" stroke="false" />
                        <YAxis dataKey="value" stroke="false" />
                        <Bar dataKey="value" fill="#00C49F" label>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % 20]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </Container>
        </>
    )
};


export default BarChartViz;