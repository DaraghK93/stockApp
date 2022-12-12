import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from "react"
import { Container } from "react-bootstrap";

function RadarChartViz({ data, overallSentiment }) {
    const [colour, setColour] = useState("#FFBB28")

    useEffect(() => {
        if (overallSentiment==="positive"){
            setColour("#32CD32")
        }
        else if (overallSentiment==="negative"){
            setColour("#FF0000")
        }
        else {
            setColour('#FFBB28')
        }

    }, [overallSentiment]);
    

    return (
        <>
            <Container>
                <ResponsiveContainer width="100%" height={300}>
                    <RadarChart cx="50%" cy="50%" outerRadius="50%" data={data}>
                        <PolarGrid gridType='circle' />
                        <PolarAngleAxis dataKey="name" />
                        <PolarRadiusAxis />
                        <Radar name="Mike" dataKey="value" stroke={colour} fill={colour} fillOpacity={0.6} />
                    </RadarChart>
                </ResponsiveContainer>
            </Container>
        </>
    )
};

export default RadarChartViz;