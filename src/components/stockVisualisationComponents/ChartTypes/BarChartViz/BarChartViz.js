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

function BarChartViz() {

    const data = [
        {
            "name": "ESG Rating",
            "E Rating": 600,
            "S Rating": 700,
            "G Rating": 200
        }
    ]


    return (
        <>
            <Container>

                <ResponsiveContainer width="100%" height={300} margin={100}>

                    <BarChart width={700} height={100} data={data}>
                    <Legend layout="vertical" verticalAlign="middle" align="right" />
                        <XAxis dataKey="name" stroke="false" hide="true"/>
                        <YAxis stroke="false" 
                        />
                        <Legend />
                        <Bar dataKey="E Rating" fill="#00C49F">
                        <LabelList dataKey="E Rating" position="top" />
                        </Bar>
                        <Bar dataKey="S Rating" fill="#FFBB28">
                        <LabelList dataKey="S Rating" position="top" />
                        </Bar>

                        <Bar dataKey="G Rating" fill="#FF8042">
                        <LabelList dataKey="G Rating" position="top" />
                        </Bar>

                    </BarChart>
                </ResponsiveContainer>


            </Container>
        </>
    )
};


export default BarChartViz;