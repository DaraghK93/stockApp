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

function StockESGChart() {

    const data = [
        {
            "name": "ESG Rating",
            "E Rating": 600,
            "S Rating": 980,
            "G Rating": 200
        }
    ]


    return (
        <>
            <Container>

                <ResponsiveContainer width="100%" height={300} margin={100}>

                    <BarChart width={730} height={250} data={data}>
                        <XAxis dataKey="name" stroke="false" hide="true" />
                        <YAxis stroke="false"
                        />
                        <Legend />
                        <Bar dataKey="E Rating" fill="#8884d8" label>
                            <LabelList dataKey="E Rating" position="top" />
                        </Bar>
                        <Bar dataKey="S Rating" fill="#82ca9d" label>
                            <LabelList dataKey="S Rating" position="top" />
                        </Bar>

                        <Bar dataKey="G Rating" fill="#82ca9d" label>
                            <LabelList dataKey="G Rating" position="top" />
                        </Bar>

                    </BarChart>
                </ResponsiveContainer>


            </Container>
        </>
    )
};


export default StockESGChart;