import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Cell
} from "recharts";

import { useState, useEffect } from "react"
import { Container } from "react-bootstrap";

function BarChartViz({ data, title }) {
    const [content, setContent] = useState("#FFBB28")

    useEffect(() => {
        if (String(title)==="News Sentiment"){
            setContent("Number of Articles")
        }
        else if (String(title)==="Twitter Sentiment"){
            setContent("Number of Tweets")
        }
        
    }, [title]);

    const COLORS = [
        // '#0088FE', 
        '#32CD32', '#FF0000', '#FFBB28' ];

    return (
        <>
            <Container>
                <ResponsiveContainer width="100%" height={300} margin={100}>
                    <BarChart width={700} height={100} data={data}>
                        <XAxis dataKey="name" stroke="false" />
                        <YAxis label={{angle:-90, value:content, dx:-25,textAnchor: 'start', fontSize:"1.25rem"}} allowDecimals={false} dataKey="value" stroke="false"/>
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