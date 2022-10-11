import {
    PieChart,
    Pie,
    ResponsiveContainer,
    Cell
} from "recharts";


import { Container } from "react-bootstrap";



function StockNewsSentimentChart() {
    const data = [
        { name: 'Positive', value: 600 },
        { name: 'Negative', value: 300 },
        { name: 'Neutral', value: 100 }
        // ,
        // { name: 'No Sentiment', value: 100 }
    ];

    const COLORS = [
        // '#0088FE', 
        '#00C49F', '#FFBB28', '#FF8042'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <>
            <Container>
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <p>I need a Legend!</p>
            </Container>
        </>
    )
};




export default StockNewsSentimentChart;