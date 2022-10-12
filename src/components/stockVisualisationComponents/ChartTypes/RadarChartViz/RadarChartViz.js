import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';



import { Container } from "react-bootstrap";

function RadarChartViz() {

    const data = [
        {
            subject: 'Positive',
            A: 100
        },
        {
            subject: 'Negative',
            A: 98
        },
        {
            subject: 'Neutral',
            A: 26
        }
    ];

    return (
        <>
            <Container>
                <ResponsiveContainer width="100%" height={250}>
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                        <PolarGrid gridType='circle'/>
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis />
                        <Radar name="Mike" dataKey="A" stroke="#FFBB28" fill="#FFBB28" fillOpacity={0.6} />
                    </RadarChart>
                </ResponsiveContainer>
            </Container>
        </>
    )
};

export default RadarChartViz;