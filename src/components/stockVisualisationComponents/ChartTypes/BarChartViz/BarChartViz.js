import {
    BarChart,
    Bar,
    Legend,
    XAxis,
    YAxis,
    ResponsiveContainer,
    LabelList,
    Label
} from "recharts";

import { Container } from "react-bootstrap";

function BarChartViz({ data }) {

    // const data = [
    //     {
    //         "name": "ESG Rating",
    //         "E Rating": 600,
    //         "S Rating": 700,
    //         "G Rating": 200
    //     }
    // ]

    return (
        <>
            <Container>
                <ResponsiveContainer width="100%" height={300} margin={100}>
                    <BarChart width={700} height={100} data={data}>
                    {/* <Legend layout="vertical" verticalAlign="middle" align="right" /> */}
                        <XAxis dataKey="name" stroke="false" />
                        <YAxis 
                        dataKey="value" stroke="false" 
                        />
              
                        <Bar dataKey="value" fill="#00C49F">
                        {/* <LabelList dataKey="name" position="bottom" /> */}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </Container>
        </>
    )
};


export default BarChartViz;