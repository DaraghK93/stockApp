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
                        <XAxis dataKey="name" stroke="false" hide="true"/>
                        <YAxis stroke="false" 
                        />
                        <Legend />
                        <Bar dataKey="E Rating" fill="#00C49F" label>
                        </Bar>
                        <Bar dataKey="S Rating" fill="#FFBB28" label>
                        </Bar>

                        <Bar dataKey="G Rating" fill="#FF8042" label>
                        </Bar>

                    </BarChart>
                </ResponsiveContainer>


            </Container>
        </>
    )
};


export default StockESGChart;